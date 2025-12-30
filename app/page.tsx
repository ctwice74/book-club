import { BookSection } from "@/components/BookSection";
import { DiscussionSection } from "@/components/DiscussionSection";
import { MeetingSection } from "@/components/MeetingSection";
import { ProposalSection } from "@/components/ProposalSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                Book Club HQ
              </p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Keep your club reading in sync.
              </h1>
            </div>
            <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
              Member workspace
            </span>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            Track your reading queue, capture meeting plans, and save your
            discussion notes in one place. Authentication will be added in a
            future iteration.
          </p>
        </header>

        <div className="grid gap-6">
          <BookSection />
          <ProposalSection />
          <MeetingSection />
          <DiscussionSection />
        </div>
      </div>
    </main>
  );
}
