"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useInView, useReducedMotion } from "framer-motion";
import { Bot, FileText, RotateCcw } from "lucide-react";
import { chatDemo, type ChatTurn } from "@/content/ai";
import { cn } from "@/lib/utils";

// Plays a scripted conversation from content/ai.ts. No network calls.
// Framer Motion is scoped to this widget, so it only loads on pages that show the demo.
export function ChatDemo() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ChatDemoPlayer />
      </MotionConfig>
    </LazyMotion>
  );
}

function ChatDemoPlayer() {
  const [scenarioId, setScenarioId] = useState(chatDemo.scenarios[0].id);
  const [shown, setShown] = useState<ChatTurn[]>([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(
    (id: string) => {
      clear();
      const turns = chatDemo.scenarios.find((s) => s.id === id)?.turns ?? [];
      setShown([]);
      setDone(false);
      setTyping(false);
      if (reduce) {
        setShown(turns);
        setDone(true);
        return;
      }
      let t = 300;
      turns.forEach((turn, i) => {
        if (turn.role === "assistant") {
          timers.current.push(window.setTimeout(() => setTyping(true), t));
          t += 1100;
        }
        timers.current.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown((prev) => [...prev, turn]);
            if (i === turns.length - 1) setDone(true);
          }, t),
        );
        t += turn.role === "user" ? 700 : 1300;
      });
    },
    [reduce],
  );

  useEffect(() => {
    if (!inView) return;
    // Starting playback on scroll-into-view is the intended side effect here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    play(scenarioId);
    return clear;
  }, [inView, scenarioId, play]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [shown, typing, reduce]);

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Choose a demo scenario">
        {chatDemo.scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === scenarioId}
            onClick={() => (s.id === scenarioId ? play(s.id) : setScenarioId(s.id))}
            className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white aria-pressed:border-ai-400 aria-pressed:bg-ai-600/25 aria-pressed:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white shadow-float">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ai-600 text-white">
              <Bot className="size-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{chatDemo.title}</p>
              <p className="text-xs text-subtle">{chatDemo.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => play(scenarioId)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted ring-1 ring-line transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" /> Replay
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[340px] space-y-3 overflow-y-auto bg-surface-2 px-4 py-5 sm:h-[360px] sm:px-5"
          role="log"
          aria-live="polite"
          aria-label="Demo conversation"
        >
          <AnimatePresence initial={false}>
            {shown.map((turn, i) => (
              <m.div
                key={`${scenarioId}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex", turn.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className="max-w-[85%]">
                  <p
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-[0.92rem] leading-snug",
                      turn.role === "user"
                        ? "rounded-br-sm bg-brand-600 text-white"
                        : "rounded-bl-sm bg-white text-ink-2 shadow-card ring-1 ring-line",
                    )}
                  >
                    <span className="sr-only">{turn.role === "user" ? "Customer: " : "Assistant: "}</span>
                    {turn.text}
                  </p>
                  {turn.source && (
                    <p className="mt-1.5 flex items-center gap-1 pl-1 text-xs text-subtle">
                      <FileText className="size-3" aria-hidden="true" /> Source: {turn.source}
                    </p>
                  )}
                </div>
              </m.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 shadow-card ring-1 ring-line w-fit" aria-label="Assistant is typing">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1.5 animate-blink rounded-full bg-subtle" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          )}
          {done && (
            <p className="pt-2 text-center text-xs text-subtle">
              Conversation handed to your team where needed · human review on
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{chatDemo.disclaimer}</p>
    </div>
  );
}
