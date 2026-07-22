# Playbook: Pushing to GitHub & Deploying from a Cloud Agent Sandbox

> **Agripals-specific note (read first).** This is a general playbook. Two things are different for *this* repo, and where they conflict, the repo-specific facts win:
>
> 1. **The repo already exists** — `rhy-collab/agripals`. Skip all "create the repo" steps; you only ever `git push` to it.
> 2. **Deploy target is Cloudflare, not (only) Vercel.** `agripals.com` has been served by a **Cloudflare Worker** (repo connected, deploy command `npx wrangler deploy`), and a **Vercel** project (`agripals-landing-page`) also exists off the same repo. Either way, **pushing to `main` auto-deploys** — you do not run any deploy CLI. Before acting on "we're leaving Cloudflare / close the Cloudflare PR," check the Worker's Domains tab first (see `AGENT-DEPLOY-RUNBOOK.md` §8).
> 3. **In this sandbox, `github.com` push works but `api.github.com` is BLOCKED** (unreachable), so the token sanity-check `curl .../user` below will fail here — that's expected, not a bad token. `gh` CLI won't work. Plain `git push` over HTTPS is the only path.
> 4. The concrete, tested push recipe for this repo (fresh blobless clone + rsync overlay, which sidesteps the broken local `.git`) is in **`AGENT-DEPLOY-RUNBOOK.md`** — prefer that over a naive `git push` from the local checkout.
>
> The rest of this file is the general playbook as provided.

---

## The core constraint: outbound network is an allowlisted HTTPS proxy

Cloud agent sandboxes typically sit behind a proxy that only permits plain HTTPS `CONNECT` to a short allowlist of domains. Concretely, expect this shape:

- `github.com` and `api.github.com` over HTTPS (443) — allowed. *(In this sandbox: only `github.com`; `api.github.com` is blocked.)*
- SSH on port 22 to `github.com` — blocked (connection times out).
- GitHub's SSH-over-443 trick (`ssh -p 443 git@ssh.github.com`) — also blocked (the proxy only speaks HTTP/HTTPS, not raw SSH, even on port 443).
- `vercel.com` and `api.vercel.com` — often fully blocked (curl gets `000` / connection failure, or `403`). The `vercel` CLI (`vercel login/deploy/whoami`) will not work from inside the sandbox.

Do not spend time debugging SSH keys or the Vercel CLI in-sandbox. Test connectivity once, confirm the block, and move to the workarounds.

Quick diagnostic:

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-time 8 https://github.com
curl -s -o /dev/null -w "%{http_code}\n" --max-time 8 https://api.github.com
curl -s -o /dev/null -w "%{http_code}\n" --max-time 8 https://api.vercel.com
timeout 8 ssh -T git@github.com -o ConnectTimeout=6 2>&1
```

A `400` from github.com/api.github.com over plain curl is normal (no auth) and confirms the proxy is reachable. `000` or a hung connection means it's blocked.

## GitHub: the REST API is restricted, but git push works once a repo exists

Even with a valid token, `POST /user/repos` or `GET /repos/{owner}/{repo}` on an unknown repo may return proxy-level errors like:

```
This GitHub API path is not available: sessions are bound to their configured repositories.
GitHub access to this repository is not enabled for this session. Use add_repo to request access.
```

This is a platform restriction independent of token scopes — don't interpret it as a bad token, don't keep retrying with different token permutations.

What works: `git push` over HTTPS with the token embedded in the remote URL, against a repo that already exists. Reliable sequence:

1. Get a GitHub personal access token from the user (classic PAT with `repo` scope, or a fine-grained token **with Contents: write**).
2. Sanity-check: `curl -s -H "Authorization: token $TOKEN" https://api.github.com/user` returns the profile. *(Blocked in this sandbox — skip; a successful `git ls-remote` is the real test here.)*
3. Create the repo via the GitHub **website**, not the API. If browser automation is available (`mcp__claude-in-chrome__*`), drive `https://github.com/new`; the user's Chrome is likely already logged in (screenshot to check). Otherwise ask the user to create an empty repo (no README) and share the URL.
4. Push:

```bash
git remote add origin "https://<username>:<token>@github.com/<owner>/<repo>.git"
git push -u origin main
```

## Vercel: don't fight the CLI, use the browser

`api.vercel.com` is typically unreachable, so CLI/API deploys aren't viable. Use browser automation on the user's device (already logged in):

1. Navigate to `https://vercel.com/new`.
2. Confirm login (screenshot). The "Import Git Repository" list populates with the user's repos; filter for the just-pushed repo.
3. Import → confirm project name & framework preset (a plain static site auto-detects as "Other" — correct, no build step) → Deploy.
4. Wait ~8–10s, screenshot — a "Congratulations" screen shows the live URL.
5. Navigate to the URL yourself and screenshot to confirm it renders before telling the user it's live.

Once imported, future pushes to `main` auto-deploy via the GitHub integration — no further CLI/API needed.

## What definitely will not work — stop trying

- `ssh-keygen` + deploy key expecting SSH push. Key exchange is blocked at the network layer before auth.
- Installing the `vercel` CLI and running `vercel login/deploy`. Install succeeds; every network call fails.
- `device_bash` for internet operations — it runs in an isolated local VM with no network. Fine for local files, never for git/npm/curl.
- Retrying a blocked GitHub REST endpoint with a different token/scope. The block is architectural, not permissions.

## Credential handling

- Never enter the user's password into any login form yourself — ask the user to log in and wait.
- A PAT the user pastes into chat is fine to use for that session. **Never write the raw token into any persistent memory/notes file** — it's a live credential. If a future session needs it, ask the user to paste it again.

## TL;DR sequence

1. Test connectivity — confirm the shape of what's blocked.
2. Get a GitHub PAT; verify it (`/user`, or `git ls-remote` where the API is blocked).
3. Create the repo via the website — never the REST API. *(Agripals: already exists, skip.)*
4. `git push` over HTTPS with the token in the remote URL. *(Agripals: use the recipe in `AGENT-DEPLOY-RUNBOOK.md`.)*
5. Deploy via `vercel.com/new` in the browser — never the CLI/API. *(Agripals: push auto-deploys via Cloudflare/Vercel; no deploy step.)*
6. Verify by navigating to the live URL and screenshotting it.
