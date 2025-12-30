"use client";

import { useEffect, useState } from "react";

import { Section } from "./Section";

type Meeting = {
  id: string;
  scheduledAt: string;
  location: string;
  agenda: string;
};

export function MeetingSection() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    scheduledAt: "",
    location: "",
    agenda: ""
  });

  async function loadMeetings() {
    setLoading(true);
    const response = await fetch("/api/meetings");
    if (response.ok) {
      const data = (await response.json()) as { meetings: Meeting[] };
      setMeetings(data.meetings);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm({ scheduledAt: "", location: "", agenda: "" });
      loadMeetings();
    }
  }

  return (
    <Section title="Upcoming Meetings">
      <form
        onSubmit={onSubmit}
        className="mb-6 flex flex-col gap-3 md:grid md:grid-cols-3"
      >
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          type="datetime-local"
          value={form.scheduledAt}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, scheduledAt: event.target.value }))
          }
          required
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Location"
          value={form.location}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, location: event.target.value }))
          }
          required
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-white/90 px-3 py-2"
          placeholder="Agenda"
          value={form.agenda}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, agenda: event.target.value }))
          }
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-400 px-4 py-2 text-slate-900 md:col-span-3"
        >
          Schedule meeting
        </button>
      </form>
      {loading ? (
        <p className="text-slate-300">Loading meetings...</p>
      ) : meetings.length === 0 ? (
        <p className="text-slate-400">No meetings scheduled yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="rounded-xl border border-slate-800 p-4">
              <p className="text-sm text-slate-400">
                {new Date(meeting.scheduledAt).toLocaleString()}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {meeting.location}
              </h3>
              <p className="mt-1 text-sm text-slate-300">{meeting.agenda}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
