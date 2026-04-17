import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.scoreEntry.deleteMany();

    return Response.json({ message: "All entries deleted" });
  } catch (error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}