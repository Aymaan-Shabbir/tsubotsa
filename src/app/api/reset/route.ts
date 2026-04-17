import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.scoreEntry.deleteMany();

    return Response.json({ message: "All entries deleted" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to delete entries" },
      { status: 500 },
    );
  }
}
