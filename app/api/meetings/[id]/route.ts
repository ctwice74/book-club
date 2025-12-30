import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payload = (await request.json()) as {
    scheduledAt?: string;
    location?: string;
    agenda?: string;
  };

  const meeting = await prisma.meeting.update({
    where: { id: params.id },
    data: {
      scheduledAt: payload.scheduledAt
        ? new Date(payload.scheduledAt)
        : undefined,
      location: payload.location,
      agenda: payload.agenda
    }
  });

  return NextResponse.json({ meeting });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.meeting.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ ok: true });
}
