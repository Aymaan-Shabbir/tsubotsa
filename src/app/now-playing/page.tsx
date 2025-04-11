"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NowPlayingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const teamId = searchParams.get("teamId");
  const teamName = searchParams.get("teamName");

  const [goal, setGoal] = useState(0);
  const [minus10, setMinus10] = useState(0);
  const [minus20, setMinus20] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  const score = goal * 50 - minus10 * 10 - minus20 * 20 - resetCount * 50;

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
        score,
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to submit score.");
    }
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Now Playing</h1>
      <p className="text-center text-gray-600 mb-2">Team: {teamName}</p>
      <p className="text-center text-gray-500 mb-6">ID: {teamId}</p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        <button
          onClick={() => setGoal(goal + 1)}
          className="bg-green-500 text-white py-2 rounded-xl"
        >
          Goal (+50): {goal}
        </button>
        <button
          onClick={() => setMinus10(minus10 + 1)}
          className="bg-red-500 text-white py-2 rounded-xl"
        >
          -10: {minus10}
        </button>
        <button
          onClick={() => setMinus20(minus20 + 1)}
          className="bg-red-700 text-white py-2 rounded-xl"
        >
          -20: {minus20}
        </button>
        <button
          onClick={() => setResetCount(resetCount + 1)}
          className="bg-yellow-500 text-white py-2 rounded-xl"
        >
          Reset: {resetCount}
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        Total Score: {score}
      </h2>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
