import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payload = (await request.json()) as {
    title?: string;
    author?: string;
    description?: string;
    status?: "PROPOSED" | "ACTIVE" | "COMPLETED";
  };

  const book = await prisma.book.update({
    where: { id: params.id },
    data: {
      title: payload.title,
      author: payload.author,
      description: payload.description,
      status: payload.status
    }
  });

  return NextResponse.json({ book });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.book.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ ok: true });
}
