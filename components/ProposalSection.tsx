"use client";

import { useEffect, useState } from "react";

import { Section } from "./Section";

type Proposal = {
  id: string;
  rationale: string;
  proposedBy: string;
  createdAt: string;
  book: { id: string; title: string; author: string };
};

type BookOption = { id: string; title: string; author: string };

export function ProposalSection() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [books, setBooks] = useState<BookOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ bookId: "", rationale: "" });

  async function loadData() {
    setLoading(true);
    const [proposalResponse, bookResponse] = await Promise.all([
      fetch("/api/proposals"),
      fetch("/api/books")
    ]);

    if (proposalResponse.ok) {
      const data = (await proposalResponse.json()) as { proposals: Proposal[] };
      setProposals(data.proposals);
    }

    if (bookResponse.ok) {
      const data = (await bookResponse.json()) as { books: BookOption[] };
      setBooks(data.books);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm({ bookId: "", rationale: "" });
      loadData();
    }
  }

  return (
    <Section title="Book Proposals">
      <form
        onSubmit={onSubmit}
        className="mb-6 flex flex-col gap-3 md:grid md:grid-cols-3"
      >
        <select
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          value={form.bookId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, bookId: event.target.value }))
          }
          required
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} — {book.author}
            </option>
          ))}
        </select>
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Why should we read it?"
          value={form.rationale}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, rationale: event.target.value }))
          }
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-400 px-4 py-2 text-slate-900"
        >
          Add proposal
        </button>
      </form>
      {loading ? (
        <p className="text-slate-300">Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <p className="text-slate-400">No proposals yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {proposals.map((proposal) => (
            <li key={proposal.id} className="rounded-xl border border-slate-800 p-4">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {proposal.book.title}
              </h3>
              <p className="text-sm text-slate-400">
                {proposal.book.author}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {proposal.rationale}
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Proposed by {proposal.proposedBy} ·{" "}
                {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
