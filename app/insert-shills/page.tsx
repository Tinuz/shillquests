"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Quest = {
  id: string;
  assignment?: string;
};

type LeaderboardEntry = {
  wallet: string;
  score: number;
};

export default function InsertShillQuests() {
  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey ? publicKey.toBase58() : "";

  const [balance, setBalance] = useState(13.37);
  const [quest, setQuest] = useState<Quest | null>(null);
  const [insertId, setInsertId] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Leaderboard ophalen
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(Array.isArray(data.entries) ? data.entries : []))
      .catch(() => setLeaderboard([]));
  }, []);

  // Quest aanvragen
  const handleInsert = async () => {
    if (!connected || !walletAddress) {
      alert("Connect your wallet first!");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/insert-quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletAddress }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.quest) {
      setQuest(data.quest);
      setInsertId(data.insertId || null);
      setBalance(0);
    } else {
      alert(data.error || "Failed to get quest");
    }
  };

  // Quest indienen
  const handleSubmitProof = async () => {
    if (!insertId || !proofUrl) return;
    setLoading(true);
    const res = await fetch("/api/submit-quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ insertId, proofUrl }),
    });
    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      // Optioneel: leaderboard opnieuw ophalen
      fetch("/api/leaderboard")
        .then((res) => res.json())
        .then((data) => setLeaderboard(Array.isArray(data.entries) ? data.entries : []));
    } else {
      const data = await res.json();
      alert(data.error || "Submission failed");
    }
  };

  return (
    <div
      className="min-h-screen font-retro text-retro"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #d2b77c 60%, #8c6b3f 100%)",
        position: "relative",
      }}
    >
      {/* CRT overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 6px, #fffbe805 8px, transparent 10px)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-20 p-6">
        <Header balance={balance} />
        <section className="text-center mt-10">
          <h2
            className="text-xl md:text-2xl mb-6 italic text-retro"
            style={{ color: "#8d5c1b", textShadow: "0 2px 8px #fffbe855" }}
          >
            “Pay to promote something pointless. It's the future of labor.”
          </h2>
          {!quest ? (
            <button
              onClick={handleInsert}
              className="btn-retro text-lg py-6 px-10 rounded shadow transition hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? "Loading..." : "Insert 13.37 $FOOF to receive quest"}
            </button>
          ) : (
            <div className="max-w-xl mx-auto mt-10 bg-retro-gradient border-2 border-[#d2b77c] rounded-lg shadow-retro">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-retro" style={{ color: "#8c6b3f" }}>
                  Quest #{quest.id}
                </h3>
                <p className="mb-4">{quest.assignment || "Voer je opdracht uit!"}</p>
                <input
                  type="url"
                  className="w-full px-2 py-1 mb-2 border border-[#d2b77c] rounded font-retro"
                  placeholder="Proof URL (X post link)"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  disabled={loading || submitted}
                  required
                />
                <button
                  className="btn-retro py-3 px-8 rounded shadow transition hover:scale-105 active:scale-95 mt-2"
                  style={{
                    background: "linear-gradient(90deg, #388e3c 60%, #d2b77c 100%)",
                    color: "#fffbe8",
                    borderColor: "#8c6b3f",
                  }}
                  onClick={handleSubmitProof}
                  disabled={loading || !proofUrl || submitted}
                >
                  {submitted
                    ? "Submitted"
                    : loading
                    ? "Submitting..."
                    : "Submit Quest"}
                </button>
                {submitted && (
                  <div className="mt-4 text-[#cc3d3d] font-retro text-sm">
                    Submission under review (lol)
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="mt-20 max-w-3xl mx-auto">
          <h2
            className="text-xl font-bold mb-4 text-retro"
            style={{ color: "#d2b77c", textShadow: "0 2px 8px #8c6b3f55" }}
          >
            🏆 Top Shillers
          </h2>
          <div className="bg-retro-gradient border-2 border-[#d2b77c] shadow-retro rounded-lg overflow-hidden">
            <table className="w-full text-left font-retro text-retro">
              <thead className="bg-[#fffbe8] text-[#8c6b3f] text-xs border-b-2 border-[#d2b77c]">
                <tr>
                  <th className="px-4 py-2">Wallet</th>
                  <th className="px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr className="border-t border-[#d2b77c]" key={entry.wallet}>
                    <td className="px-4 py-2">{entry.wallet}</td>
                    <td className="px-4 py-2">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
