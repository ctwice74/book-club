import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const meetings = await prisma.meeting.findMany({
    orderBy: { scheduledAt: "asc" }
  });

  return NextResponse.json({ meetings });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    scheduledAt?: string;
    location?: string;
    agenda?: string;
  };

  if (!payload.scheduledAt || !payload.location || !payload.agenda) {
    return NextResponse.json(
      { error: "Scheduled date, location, and agenda are required." },
      { status: 400 }
    );
  }

  const meeting = await prisma.meeting.create({
    data: {
      scheduledAt: new Date(payload.scheduledAt),
      location: payload.location,
      agenda: payload.agenda
    }
  });

  return NextResponse.json({ meeting }, { status: 201 });
}
