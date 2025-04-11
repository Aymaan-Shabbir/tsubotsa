// app/api/score/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      teamId,
      teamName,
      goalCount,
      minus10Count,
      minus20Count,
      resetCount,
      score,
    } = await req.json();

    const newScore = await prisma.scoreEntry.create({
      data: {
        teamId,
        teamName,
        goalCount,
        minus10Count,
        minus20Count,
        resetCount,
        score,
      },
    });

    return NextResponse.json(
      { success: true, data: newScore },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create score entry" },
      { status: 500 }
    );
  }
}
