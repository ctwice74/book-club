import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.proposal.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ ok: true });
}
