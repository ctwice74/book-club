import type { PropsWithChildren } from "react";

export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
