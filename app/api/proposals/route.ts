import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
    include: { book: true }
  });

  return NextResponse.json({ proposals });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    bookId?: string;
    rationale?: string;
  };

  if (!payload.bookId || !payload.rationale) {
    return NextResponse.json(
      { error: "Book and rationale are required." },
      { status: 400 }
    );
  }

  const proposal = await prisma.proposal.create({
    data: {
      bookId: payload.bookId,
      proposedBy: "Member",
      rationale: payload.rationale
    },
    include: { book: true }
  });

  return NextResponse.json({ proposal }, { status: 201 });
}
