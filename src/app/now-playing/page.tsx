"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function NowPlaying() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const teamName = searchParams.get("teamName");
  const router = useRouter();

  const [goal, setGoal] = useState(0);
  const [minus10, setMinus10] = useState(0);
  const [minus20, setMinus20] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  const totalScore = goal * 50 - minus10 * 10 - minus20 * 20 - resetCount * 50;

  const handleSubmit = async () => {
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamId,
        teamName,
        goalCount: goal,
        minus10Count: minus10,
        minus20Count: minus20,
        resetCount,
        score: totalScore,
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to submit score. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 text-black p-6">
      <div className="relative w-full h-[100px] md:h-[150px] mb-4">
        <Image
          src="/tsubotsa.jpg"
          alt="Event Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 tracking-wide">
          ⚔️ Now Playing
        </h1>

        <div className="bg-blue-100 rounded-xl p-4 text-center shadow-inner border border-blue-200">
          <p className="text-xl font-semibold">
            Team: <span className="text-blue-900 font-bold">{teamName}</span>
          </p>
          <p className="text-sm text-blue-700">ID: {teamId}</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => setGoal(goal + 1)}
            className="flex flex-col items-center justify-center h-28 bg-green-500 text-white font-bold rounded-2xl text-lg shadow-md hover:bg-green-600 transition"
          >
            ⚽ Goal
            <span className="text-3xl mt-1">{goal}</span>
          </button>

          <button
            onClick={() => setMinus10(minus10 + 1)}
            className="flex flex-col items-center justify-center h-28 bg-red-500 text-white font-bold rounded-2xl text-lg shadow-md hover:bg-red-600 transition"
          >
            🔻 -10
            <span className="text-3xl mt-1">{minus10}</span>
          </button>

          <button
            onClick={() => setMinus20(minus20 + 1)}
            className="flex flex-col items-center justify-center h-28 bg-red-700 text-white font-bold rounded-2xl text-lg shadow-md hover:bg-red-800 transition"
          >
            ⛔ -20
            <span className="text-3xl mt-1">{minus20}</span>
          </button>

          <button
            onClick={() => setResetCount(resetCount + 1)}
            className="flex flex-col items-center justify-center h-28 bg-yellow-400 text-black font-bold rounded-2xl text-lg shadow-md hover:bg-yellow-500 transition"
          >
            🔄 Reset
            <span className="text-3xl mt-1">{resetCount}</span>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-lg"
        >
          ✅ Submit Score
        </button>
      </div>
    </main>
  );
}
