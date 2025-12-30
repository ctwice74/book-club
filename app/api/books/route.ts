import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      proposals: true,
      discussions: true
    }
  });

  return NextResponse.json({ books });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    title?: string;
    author?: string;
    description?: string;
    status?: "PROPOSED" | "ACTIVE" | "COMPLETED";
  };

  if (!payload.title || !payload.author || !payload.description) {
    return NextResponse.json(
      { error: "Title, author, and description are required." },
      { status: 400 }
    );
  }

  const book = await prisma.book.create({
    data: {
      title: payload.title,
      author: payload.author,
      description: payload.description,
      status: payload.status ?? "PROPOSED"
    }
  });

  return NextResponse.json({ book }, { status: 201 });
}
