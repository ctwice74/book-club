import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const discussions = await prisma.discussion.findMany({
    orderBy: { createdAt: "desc" },
    include: { book: true }
  });

  return NextResponse.json({ discussions });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    bookId?: string;
    notes?: string;
  };

  if (!payload.bookId || !payload.notes) {
    return NextResponse.json(
      { error: "Book and notes are required." },
      { status: 400 }
    );
  }

  const discussion = await prisma.discussion.create({
    data: {
      bookId: payload.bookId,
      notes: payload.notes,
      createdBy: "Member"
    },
    include: { book: true }
  });

  return NextResponse.json({ discussion }, { status: 201 });
}
