# Agent runbook — file access + publishing to GitHub (Agripals)

If you are an agent that has been told "I can't push, the local `.git` is broken / I'm 34 commits behind / there's a pile of pre-staged files" — **this file solves that.** Read it fully before touching git.

---

## TL;DR

1. Get the folder mounted (`request_cowork_directory` → `/Users/rhys/Downloads/Projects/Agripals`).
2. Edit files normally in that folder.
3. **Never use the repo's local `.git`.** It is stale, permission-broken on the FUSE mount, and its index is full of junk.
4. Publish by cloning `origin/main` fresh into `/tmp`, rsyncing the working files over it, committing, and pushing. The diff then contains **only genuine changes vs origin** — the stale local index can't contaminate it.
5. Wait ~40s, then verify the live URL.

---

## 1. Getting file access

The project lives on the user's Mac at:

```
/Users/rhys/Downloads/Projects/Agripals
```

If you can't see it, request it:

```
request_cowork_directory  path: /Users/rhys/Downloads/Projects/Agripals
```

Useful wider mounts (ask only if you need them):
- `/Users/rhys/Downloads/Projects` — all their projects (Charter Law, Standard Legal, Haggle, Hermes Agent…)
- `/Users/rhys/Downloads` — where browser downloads land

`/Users/rhys` (home) is **blocked** — it holds Cowork session storage. Request a project folder instead.

## 2. Path mapping (this trips everyone up)

Two different path spaces:

| Tool | Path to use |
|---|---|
| `Read` / `Write` / `Edit` / `Grep` / `Glob` | `/Users/rhys/Downloads/Projects/Agripals/...` (host path) |
| `bash` | `/sessions/<session-id>/mnt/Agripals/...` (mount path) |

Passing a `/sessions/...` path to Read/Write/Edit will fail — those run on the host. Passing the host path to bash will fail too. Check your own session's mapping in the system prompt's "Shell access" section.

## 3. The golden rule: don't use the local `.git`

The checkout at `Agripals/.git` is on a FUSE mount and is **unreliable**:

- `rm`, `rmdir` and lockfile cleanup throw `EPERM: operation not permitted`
- `git reset` / `git rebase` can silently fail to move `HEAD`
- its branch has diverged from `origin/main` (behind *and* ahead)
- its index has a large pile of unrelated staged files

Committing from it risks bundling unrelated work into one commit — which the project's handoff docs explicitly forbid without Rhys's sign-off.

**So don't.** Use the recipe below instead. It never reads or writes the local `.git` at all.

## 4. The publish recipe (copy this)

```bash
cd /sessions/<session-id>/mnt/Agripals
TOK="<github token — see §5>"

# 1. fresh, shallow, blobless clone of the real remote
rm -rf /tmp/sync && mkdir -p /tmp/sync && cd /tmp/sync
git init -q -b main
git remote add origin "https://x-access-token:${TOK}@github.com/rhy-collab/agripals.git"
timeout 40 git fetch --depth 1 --filter=blob:none origin main
git update-ref refs/heads/main "$(git rev-parse FETCH_HEAD)"
git symbolic-ref HEAD refs/heads/main

# 2. overlay the working files (NOT the local .git)
rsync -a --delete \
  --exclude '.git' --exclude '.fuse_hidden*' --exclude '*.bak' \
  --exclude 'node_modules' --exclude '.next' --exclude 'agripals landing D/dist' \
  /sessions/<session-id>/mnt/Agripals/ /tmp/sync/

# 3. stage, and REVIEW before committing
git config user.email "rhys.coombes@gmail.com"
git config user.name  "Rhys Coombes"
git add -A
git diff --cached --name-only        # <-- read this. See §7.

# 4. commit + push (redact the token from any output)
git commit -q -m "Clear message describing only what you changed"
timeout 43 git push origin main 2>&1 | sed -E "s/${TOK}/***/g"
```

**Why this fixes the "34 commits behind" problem:** you start from `origin/main`, so "behind" is meaningless. And because `git add -A` diffs the working files against the *remote* tree, any file that merely sits pre-staged locally but is byte-identical to origin produces **no diff at all** and cannot sneak into your commit.

`--filter=blob:none` keeps the fetch fast (the repo has decks and image assets; a full clone times out at 45s).

## 5. Token handling — read this carefully

- The token is a GitHub PAT with `Contents: write`. A fine-grained token **without** that scope returns 403.
- It is **not stored in this repo, and must never be committed.** Don't paste it into any file, doc, commit message, or log.
- Convention in past sessions: kept at `/tmp/work/.tok` in the sandbox. `/tmp` is wiped when the sandbox restarts, so it will often be missing — ask Rhys for it rather than hunting around.
- Always pipe push/fetch output through `sed -E "s/${TOK}/***/g"` so it can't leak into a transcript.
- `api.github.com` is blocked from the sandbox. `github.com` over HTTPS works. So: no GitHub REST API, no `gh` CLI — plain git over HTTPS only.

If you have no token and can't get one, **don't force anything.** Tell Rhys and offer the manual route: drag the file onto `https://github.com/rhy-collab/agripals/upload/main` and commit to `main`.

## 6. What never gets committed

`node_modules`, `.next`, build `dist` folders, `.bak` files, `.fuse_hidden*`, and the local `.git`. The rsync excludes above handle all of it. A stray `node_modules` commit is hundreds of megabytes — check `git diff --cached --name-only | wc -l` if the number looks wild.

## 7. Review the staged list every time

Before committing, read `git diff --cached --name-only`. You will sometimes legitimately see files you didn't touch — background agents and the user edit this folder too, so the mount can be genuinely ahead of origin. That's usually fine and worth carrying along.

But if you see something you can't explain, **stop and ask** rather than committing it. Never sweep in a large unrelated change under a commit message about your small one.

## 8. Verify the deploy

Pushing to `main` auto-deploys. Then:

1. Wait ~40 seconds (`sleep 40`) — builds are not instant.
2. Fetch the live URL with a cache-buster: `https://agripals.com/<page>?v=<something-new>`.
3. For anything JavaScript-rendered, `web_fetch` only returns the shell — load it in the browser (`claude-in-chrome`) and screenshot to confirm it actually paints.

**Hosting caveat:** the deploy target has moved around. It has been served by a **Cloudflare Worker** (repo connected, deploy command `npx wrangler deploy`) and separately by a **Vercel** project (`agripals-landing-page`). Some handoff docs say Vercel; the Worker was verified serving `agripals.com` in a live session. Before acting on any "we're leaving Cloudflare" instruction — or closing the Cloudflare bot PR — **check the Worker's Domains tab first**, or you may take the live site down.

Public serving is filtered by `.assetsignore` at the repo root (gitignore syntax). It currently blocks `.git`, `*.md`, `*.pptx`, `docs/`, `ops/`, `assets/`, `node_modules/`, `agripals landing D/` and the scratch folders — that's deliberate, so investor decks and source aren't downloadable from the live domain. If you add a page that needs an asset served, make sure that asset isn't excluded.

## 9. Known failures and their fixes

| Symptom | Cause | Fix |
|---|---|---|
| `EPERM: operation not permitted` on `rm`/`rmdir` | FUSE mount | Never delete on the mount; do the work in `/tmp` |
| `git reset` reports success but `HEAD` didn't move | FUSE lockfile failure | Don't use local `.git` — use §4 |
| Clone times out at 45s | repo has large binaries | `--depth 1 --filter=blob:none` |
| `vite build` fails in `emptyOutDir` | can't clear `dist` on the mount | build with `--outDir /tmp/dist --emptyOutDir` |
| Push returns 403 | token lacks `Contents: write` | get a token with the right scope |
| Push rejected, non-fast-forward | you used the local `.git` | use §4 |
| Icons wrong size / misaligned | lucide replaces `<i>` with `<svg>`, so CSS `i` selectors stop matching | target `svg` in your selectors |

## 10. Hard rules

- Don't redesign the homepage (`index.html`) or `/automation`'s first screen without explicit sign-off — both are signed off.
- Don't invent testimonials, customers, logos, or results. This is a real pre-launch company.
- Don't publish pricing without Rhys.
- Don't touch DNS, nameservers, or email config — verify only.
- Don't merge or act on bot PRs without asking.
- Deploy only by committing to `main`. No CLI deploys.

## 11. Related docs in this repo

- `AGRIPALS-AUTOMATION.md` — the Restaurant Automation product brief (design tokens, page structure, honesty rules, next steps)
- `DNS-Migration-GoDaddy.md` — DNS runbook
- `docs/agripals-sms-first-order-flow.md` — SMS order-number + status spine
- `backend-todo-rag-customer-db.md` — backend roadmap
