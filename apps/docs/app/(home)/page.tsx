"use client";
import { Shadcn } from "@/components/shadcn/Shadcn";
import { DocsRuntimeProvider } from "./DocsRuntimeProvider";

export default function HomePage() {
  return (
    <main className="container max-w-[1100px] px-2 py-16 lg:py-16">
      <div className="mx-auto flex h-[650px] w-full max-w-screen-xl flex-col overflow-hidden rounded-lg border shadow">
        <DocsRuntimeProvider>
          <Shadcn />
        </DocsRuntimeProvider>
      </div>
    </main>
  );
}