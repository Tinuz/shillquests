"use client";

import { useState } from 'react';

export default function InsertShillQuests() {
  const [hasInserted, setHasInserted] = useState(false);
  const [quest, setQuest] = useState('');
  const [balance, setBalance] = useState(13.37);

  const handleInsert = () => {
    setHasInserted(true);
    setQuest(
      'Post a photo of a toaster and say: “This is where my alpha comes from. $FOOF #InsertToShill”'
    );
    setBalance(0);
  };

  const handleDidIt = () => {
    alert('Congrats on completing your shill quest!');
  };

  return (
    <div className="min-h-screen font-retro text-retro"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #d2b77c 60%, #8c6b3f 100%)",
        position: "relative"
      }}
    >
      {/* CRT overlay effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 6px, #fffbe805 8px, transparent 10px)",
          mixBlendMode: "overlay"
        }}
      />

      <div className="relative z-20 p-6">
        <header className="flex justify-between items-center py-4 border-retro mb-8 bg-[#fffbe80a] shadow-retro rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-retro drop-shadow"
            style={{ letterSpacing: 2 }}
          >
            INSERT SHILL QUESTS™
          </h1>
          <span className="text-xs md:text-sm text-retro bg-[#fffbe8] px-3 py-1 rounded border border-[#d2b77c] shadow"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            $FOOF Balance: {balance.toFixed(2)}
          </span>
        </header>

        <section className="text-center mt-10">
          <h2 className="text-xl md:text-2xl mb-6 italic text-retro"
            style={{ color: "#8d5c1b", textShadow: "0 2px 8px #fffbe855" }}
          >
            “Pay to promote something pointless. It's the future of labor.”
          </h2>
          {!hasInserted ? (
            <button
              onClick={handleInsert}
              className="btn-retro text-lg py-6 px-10 rounded shadow transition hover:scale-105 active:scale-95"
            >
              Insert 13.37 $FOOF to receive quest
            </button>
          ) : (
            <div className="max-w-xl mx-auto mt-10 bg-retro-gradient border-2 border-[#d2b77c] rounded-lg shadow-retro">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-retro"
                  style={{ color: "#8c6b3f" }}
                >
                  Quest #SQ-014
                </h3>
                <p className="mb-4">{quest}</p>
                <p className="text-xs text-[#8d5c1b] mb-4"
                  style={{ textShadow: "0 2px 8px #d2b77c55" }}
                >
                  ⏳ 01:42:09 left
                </p>
                <button
                  className="btn-retro py-3 px-8 rounded shadow transition hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(90deg, #388e3c 60%, #d2b77c 100%)",
                    color: "#fffbe8",
                    borderColor: "#8c6b3f"
                  }}
                  onClick={handleDidIt}
                >
                  I Did It (Probably)
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-retro"
            style={{ color: "#d2b77c", textShadow: "0 2px 8px #8c6b3f55" }}
          >
            🏆 Top Shillers
          </h2>
          <div className="bg-retro-gradient border-2 border-[#d2b77c] shadow-retro rounded-lg overflow-hidden">
            <table className="w-full text-left font-retro text-retro">
              <thead className="bg-[#fffbe8] text-[#8c6b3f] text-xs border-b-2 border-[#d2b77c]">
                <tr>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Points</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#d2b77c]">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">toasterDAO</td>
                  <td className="px-4 py-2">42</td>
                  <td className="px-4 py-2" style={{ color: "#388e3c" }}>Overqualified</td>
                </tr>
                <tr className="border-t border-[#d2b77c]">
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">rugbro</td>
                  <td className="px-4 py-2">36</td>
                  <td className="px-4 py-2" style={{ color: "#cc3d3d" }}>On fire</td>
                </tr>
                <tr className="border-t border-[#d2b77c]">
                  <td className="px-4 py-2">3</td>
                  <td className="px-4 py-2">u/noalpha</td>
                  <td className="px-4 py-2">29</td>
                  <td className="px-4 py-2" style={{ color: "#8d5c1b" }}>Pending audit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="text-center text-xs text-[#8c6b3f] mt-24 font-retro"
          style={{ textShadow: "0 2px 8px #fffbe855" }}
        >
          “Foofur accepts no responsibility for any inserted shills, digital humiliation, or unexpected fame.”
        </footer>
      </div>
    </div>
  );
}
