"use client";

import { useEffect } from "react";

export function useChatAutoscroll({
  containerRef,
  key,
  skip,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  key: string;
  skip: boolean;
}) {
  useEffect(() => {
    if (containerRef.current && !skip) {
      const maxScrollTop =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;

      const targetScrollTop = maxScrollTop - window.innerHeight / 4;

      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  }, [containerRef, key, skip]);
}
