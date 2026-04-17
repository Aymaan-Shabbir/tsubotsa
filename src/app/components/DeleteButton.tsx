"use client";

export default function DeleteButton() {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "⚠️ Are you sure? This will delete ALL leaderboard data!",
    );

    if (!confirmDelete) return;

    await fetch("/api/reset", {
      method: "DELETE",
    });

    alert("All data deleted!");
    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md transition"
    >
      🗑 Reset Leaderboard
    </button>
  );
}
