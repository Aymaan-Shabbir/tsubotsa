/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Leaderboard({ searchParams }: any) {
  const password = searchParams?.pw;
  const correctPassword = process.env.XPLORICAPW;

  if (password !== correctPassword) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 text-black px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Enter Password
          </h2>
          <form method="GET" className="flex flex-col space-y-4">
            <input
              type="password"
              name="pw"
              className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              ✅ Submit
            </button>
          </form>
        </div>
      </main>
    );
  }

  const teams = await prisma.scoreEntry.findMany({
    orderBy: { score: "desc" },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6 text-black">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          🏆 Leaderboard
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-200 text-blue-900 text-left text-lg">
                <th className="py-3 px-4">Team Name</th>
                <th className="py-3 px-4">Goals</th>
                <th className="py-3 px-4">-10</th>
                <th className="py-3 px-4">-20</th>
                <th className="py-3 px-4">Reset</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.id}
                  className="border-t border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4">{team.teamName}</td>
                  <td className="py-3 px-4">{team.goalCount}</td>
                  <td className="py-3 px-4">{team.minus10Count}</td>
                  <td className="py-3 px-4">{team.minus20Count}</td>
                  <td className="py-3 px-4">{team.resetCount}</td>
                  <td className="py-3 px-4 font-bold text-blue-700">
                    {team.score}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(team.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
