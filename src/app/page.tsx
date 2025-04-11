"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const handleVerify = () => {
    const envPassword = process.env.NEXT_PUBLIC_XPLORICAPW;
    if (password === envPassword) {
      setVerified(true);
    } else {
      alert("Wrong password");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/now-playing?teamId=${teamId}&teamName=${teamName}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      <div className="relative w-full max-w-xs h-[120px] md:h-[160px] lg:h-[200px] mb-6">
        <Image
          src="/tsubotsa.jpg"
          alt="Tsubotsa Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {!verified ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm border border-blue-100">
          <h2 className="text-2xl mb-4 font-semibold text-center text-blue-600">
            Enter Password
          </h2>
          <input
            type="password"
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleVerify}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ✅ Submit
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            🎮 Enter Team Info
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
            <input
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              type="submit"
            >
              🚀 Play
            </button>
          </form>

          <Link
            href="/Leaderboard"
            className="block text-center text-blue-600 mt-6 hover:underline font-medium"
          >
            🏆 Go to Leaderboard
          </Link>
        </div>
      )}
    </main>
  );
}
