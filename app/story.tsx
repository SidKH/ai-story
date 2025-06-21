"use client";

import { useChatAutoscroll } from "@/lib/hooks/use-chat-autoscroll";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function Story() {
  const container = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "The old man lived alone in a shack by the sea. Waves crashed against the rocks, steady and cold. His hands were rough, scarred from nets and salt. Dawn was gray, the village quiet. He sat with his coffee, watching the horizon.",
      },
    ],
  });

  const userMessages = messages.filter((m) => m.role === "user");

  useChatAutoscroll({
    containerRef: container,
    key: userMessages.length.toString(),
    skip: userMessages.length === 0,
  });

  return (
    <div ref={container} className="max-h-screen overflow-y-auto font-sans">
      <div className="flex flex-col w-full max-w-2xl mx-auto px-6 py-16 space-y-10 pb-[100vh]">
        {messages.map((message) => {
          if (message.role === "user") {
            return null;
          }

          const isLastMessage = message.id === messages[messages.length - 1].id;

          return (
            <div
              key={message.id}
              className={cn(
                "whitespace-pre-wrap font-serif text-lg sm:text-xl transition-colors duration-200",
                !isLastMessage && "text-stone-400 hover:text-foreground"
              )}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          );
        })}

        {status === "ready" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-2 animate-in slide-in-from-top-5 fade-in duration-600"
          >
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="What happens next?"
                className="w-full py-2 placeholder-stone-400 bg-transparent border-b border-stone-200 focus:border-stone-400 focus:outline-none transition-colors duration-200 text-sm"
                autoFocus
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors duration-200"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
