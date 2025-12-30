"use client";

import { useEffect, useState } from "react";

import { Section } from "./Section";

type Discussion = {
  id: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  book: { id: string; title: string; author: string };
};

type BookOption = { id: string; title: string; author: string };

export function DiscussionSection() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [books, setBooks] = useState<BookOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ bookId: "", notes: "" });

  async function loadData() {
    setLoading(true);
    const [discussionResponse, bookResponse] = await Promise.all([
      fetch("/api/discussions"),
      fetch("/api/books")
    ]);

    if (discussionResponse.ok) {
      const data = (await discussionResponse.json()) as {
        discussions: Discussion[];
      };
      setDiscussions(data.discussions);
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
    const response = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm({ bookId: "", notes: "" });
      loadData();
    }
  }

  return (
    <Section title="Discussion Notes">
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
          placeholder="Discussion notes"
          value={form.notes}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, notes: event.target.value }))
          }
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-400 px-4 py-2 text-slate-900"
        >
          Add notes
        </button>
      </form>
      {loading ? (
        <p className="text-slate-300">Loading discussions...</p>
      ) : discussions.length === 0 ? (
        <p className="text-slate-400">No discussion notes yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {discussions.map((discussion) => (
            <li key={discussion.id} className="rounded-xl border border-slate-800 p-4">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {discussion.book.title}
              </h3>
              <p className="text-sm text-slate-400">
                {discussion.book.author}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {discussion.notes}
              </p>
              <p className="mt-4 text-xs text-slate-500">
                {discussion.createdBy} ·{" "}
                {new Date(discussion.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
