"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";

export default function ScrollInitializer() {
  useScrollObserver();
  return null;
}
