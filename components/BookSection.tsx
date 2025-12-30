"use client";

import { useEffect, useState } from "react";

import { Section } from "./Section";

const statuses = ["PROPOSED", "ACTIVE", "COMPLETED"] as const;

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  status: (typeof statuses)[number];
  proposals: { id: string }[];
  discussions: { id: string }[];
};

export function BookSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    status: "PROPOSED"
  });

  async function loadBooks() {
    setLoading(true);
    const response = await fetch("/api/books");
    if (response.ok) {
      const data = (await response.json()) as { books: Book[] };
      setBooks(data.books);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm({ title: "", author: "", description: "", status: "PROPOSED" });
      loadBooks();
    }
  }

  return (
    <Section title="Book List">
      <form
        onSubmit={onSubmit}
        className="mb-6 flex flex-col gap-3 md:grid md:grid-cols-4"
      >
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          required
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Author"
          value={form.author}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, author: event.target.value }))
          }
          required
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Short description"
          value={form.description}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, description: event.target.value }))
          }
          required
        />
        <select
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          value={form.status}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, status: event.target.value }))
          }
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-400 px-4 py-2 text-slate-900 md:col-span-4"
        >
          Add book
        </button>
      </form>
      {loading ? (
        <p className="text-slate-300">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-slate-400">No books yet. Add the first pick!</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {books.map((book) => (
            <li key={book.id} className="rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-400">by {book.author}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                  {book.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                {book.description}
              </p>
              <div className="mt-4 flex gap-4 text-xs text-slate-400">
                <span>{book.proposals.length} proposals</span>
                <span>{book.discussions.length} discussions</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
