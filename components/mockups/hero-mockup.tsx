
import { Bot, Lock, Send } from "lucide-react";
import { hero } from "@/content/home";

// Illustrative product mockup: a browser window with a floating AI chat bubble.
// Pure markup/CSS (no images), so it's crisp, light and fast to render. No invented numbers.
export function HeroMockup() {
  const { mockup } = hero;
  return (
    <div className="relative mx-auto w-full max-w-[560px]" aria-hidden="true">
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_60%_40%,rgb(124_58_237/0.18),transparent_70%),radial-gradient(50%_50%_at_30%_70%,rgb(37_99_235/0.18),transparent_70%)] blur-2xl" />

      <div className="animate-fade-up overflow-hidden rounded-lg border border-line bg-white shadow-float">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] text-subtle ring-1 ring-line">
            <Lock className="size-3 text-success" />
            {mockup.url}
          </div>
        </div>

        {/* page */}
        <div className="space-y-5 p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded-full bg-ink/80" />
            <div className="hidden gap-3 sm:flex">
              <div className="h-2 w-10 rounded-full bg-line" />
              <div className="h-2 w-10 rounded-full bg-line" />
              <div className="h-2 w-10 rounded-full bg-line" />
            </div>
            <div className="h-6 w-16 rounded-full bg-brand-600" />
          </div>
          <div className="grid grid-cols-5 items-center gap-5">
            <div className="col-span-3 space-y-3">
              <p className="font-display text-lg leading-tight font-bold text-ink sm:text-xl">{mockup.headline}</p>
              <div className="h-2 w-full rounded-full bg-line" />
              <div className="h-2 w-4/5 rounded-full bg-line" />
              <div className="flex gap-2 pt-1">
                <div className="h-7 w-20 rounded-full bg-brand-600" />
                <div className="h-7 w-16 rounded-full ring-1 ring-line" />
              </div>
            </div>
            <div className="col-span-2 aspect-[4/5] rounded-md bg-gradient-to-br from-brand-100 via-brand-50 to-ai-100" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-md border border-line p-3">
                <div className="size-6 rounded-md bg-brand-50 ring-1 ring-brand-100" />
                <div className="h-2 w-4/5 rounded-full bg-line" />
                <div className="h-2 w-3/5 rounded-full bg-line" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating chat */}
      <div className="animate-fade-up [animation-delay:0.35s] absolute -bottom-10 -left-2 w-[78%] max-w-[320px] sm:-bottom-12 sm:-left-10">
        <div className="animate-float rounded-lg border border-line bg-white p-4 shadow-float">
          <div className="flex items-center gap-2.5 border-b border-line pb-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ai-600 text-white">
              <Bot className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">{mockup.chat.assistantName}</p>
              <p className="flex items-center gap-1 text-[11px] text-success">
                <span className="size-1.5 rounded-full bg-success" /> Online
              </p>
            </div>
          </div>
          <div className="space-y-2.5 pt-3 text-[12.5px] leading-snug">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-600 px-3 py-2 text-white">
              {mockup.chat.question}
            </p>
            <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-surface-3 px-3 py-2 text-ink-2">
              {mockup.chat.answer}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-surface-2 py-1.5 pr-1.5 pl-3 ring-1 ring-line">
            <span className="flex-1 text-[11px] text-subtle">Type a message…</span>
            <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-white">
              <Send className="size-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
