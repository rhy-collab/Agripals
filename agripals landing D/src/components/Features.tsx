import { MessageSquare, Truck, Anchor } from 'lucide-react';

export function Features() {
  return (
    <div className="py-12 px-6 sm:px-12 md:px-20 lg:px-24 bg-white grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
      <div className="flex flex-col md:items-center md:text-center gap-4 items-start">
        <div className="mt-1 md:mt-0 p-4 bg-green-50 rounded-2xl">
          <Anchor className="w-8 h-8 text-green-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Direct Farm Supply</h3>
          <p className="text-slate-500 leading-relaxed font-medium">
            Straight from our farms to your restaurant. Unmatched freshness and highly competitive prices.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:items-center md:text-center gap-4 items-start">
        <div className="mt-1 md:mt-0 p-4 bg-green-50 rounded-2xl">
          <MessageSquare className="w-8 h-8 text-green-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Order via SMS</h3>
          <p className="text-slate-500 leading-relaxed font-medium">
            Keep your usual routine. Order exactly what you need with a simple text message.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:items-center md:text-center gap-4 items-start">
        <div className="mt-1 md:mt-0 p-4 bg-green-50 rounded-2xl">
          <Truck className="w-8 h-8 text-green-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Transparent Logistics</h3>
          <p className="text-slate-500 leading-relaxed font-medium">
            Track exactly where your oysters were picked, packed, and delivered with our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
