import { useState } from "react";
import NavBar from "../components/NavBar";
import xmrQR from "../assets/xmr-qr.jpeg";
import CreatedBy from "../components/CreatedBy";

const XMR_ADDRESS =
  "895DX5KJXNzasRzRUL7p5GF6WnVvkARiTjWost12bWLdE7wgcCtwsYUNL6fva9wvgTBVwU75Mz8cMKmMbNacCcRhNMYxRQx";

const otherWays = [
  { icon: "👋", label: "Spread the word",  description: "Tell friends who manage IBS or follow a FODMAP diet" },
  { icon: "⭐", label: "Star on GitHub",   description: "Show your support by starring the repository" },
  { icon: "💡", label: "Share ideas",      description: "Have a feature request? Open an issue on GitHub" },
];

function Donate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(XMR_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pb-8">
      <NavBar title="Donate" />

      <div className="px-4 pt-4 space-y-4">

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-4 text-center border-b border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">Support FODMAP FOSS</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
              This app is free, open-source, and never tracks you. If it's helped
              you manage your diet, a donation keeps development going.
            </p>
          </div>
          <div className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Laputa Labs built FODMAP FOSS because we believe in open software and
              user privacy. Your data stays on your device — always.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-base text-gray-800 dark:text-gray-100">Donate via Monero (XMR)</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Private, censorship-resistant digital cash
            </p>
          </div>
          <div className="px-4 py-5 flex flex-col items-center gap-4">
            <div className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm">
              <img className="w-44 h-44 block" src={xmrQR} alt="XMR donation QR code" />
            </div>
            <div className="w-full">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">Wallet address</p>
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3">
                <p className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all leading-relaxed text-center">
                  {XMR_ADDRESS}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`mt-3 w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  copied
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy address"}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-base text-gray-800 dark:text-gray-100">Other Ways to Help</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {otherWays.map((item) => (
              <div key={item.label} className="flex items-start gap-4 px-4 py-3">
                <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CreatedBy />
      </div>
    </div>
  );
}

export default Donate;
