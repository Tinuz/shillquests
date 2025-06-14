import WalletConnect from './WalletConnect';

type HeaderProps = {
  balance: number;
};

export default function Header({ balance }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-4 border-retro mb-8 bg-[#fffbe80a] shadow-retro rounded-lg">
      <h1
        className="text-2xl md:text-3xl font-bold tracking-widest text-retro drop-shadow"
        style={{ letterSpacing: 2 }}
      >
        FOOFUR SHILL QUESTS™
      </h1>
      <div className="flex items-center gap-4">
        <span
          className="text-xs md:text-sm text-retro bg-[#fffbe8] px-3 py-1 rounded border border-[#d2b77c] shadow"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          $FOOF Balance: {balance.toFixed(2)}
        </span>
        <WalletConnect />
      </div>
    </header>
  );
}