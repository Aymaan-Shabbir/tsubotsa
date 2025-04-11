import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {
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
