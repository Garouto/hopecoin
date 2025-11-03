"use client"

import Image from "next/image"

export function TokenomicsSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-20 px-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 204, 77, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 204, 77, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div className="relative flex items-center justify-center">
            {/* Circular frame with glow */}
            <div className="relative w-[500px] h-[500px]">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-purple-500/20 blur-3xl animate-pulse-glow" />

              {/* Main circle */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-black via-purple-900/50 to-black border-2 border-yellow-500/30" />

              {/* Orbital rings */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-12 rounded-full border border-yellow-500/20" />
              </div>
              <div className="absolute inset-0 animate-spin-slower">
                <div className="absolute inset-4 rounded-full border border-orange-500/20" />
              </div>

              {/* Monk image in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 animate-float">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-mTr7z9TSBDKKxb1TOCrchiPkVwkb1F.png"
                    alt="HOPE COIN"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating percentage symbols */}
              <div className="absolute top-20 right-20 text-yellow-500/40 text-4xl font-bold animate-float">0%</div>
              <div className="absolute bottom-32 left-16 text-orange-500/40 text-3xl font-bold animate-float-delayed">
                1B
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="text-gray-400 text-sm font-mono mb-2">[E:04]</div>
              <h2 className="text-6xl md:text-7xl font-black text-white mb-4">
                TOKENO<span className="text-yellow-500">MICS</span>
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-transparent" />
            </div>

            {/* Tokenomics info */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Total Supply */}
              <div className="space-y-2">
                <h3 className="text-gray-400 text-lg font-semibold">Total supply</h3>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 text-xl mt-1">▶</span>
                  <p className="text-white text-2xl font-bold">1 Billion</p>
                </div>
              </div>

              {/* Buy/Sell Tax */}
              <div className="space-y-2">
                <h3 className="text-gray-400 text-lg font-semibold">Buy/Sell tax</h3>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 text-xl mt-1">▶</span>
                  <p className="text-white text-2xl font-bold">0% Tax Free</p>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl mt-1">✓</span>
                <p className="text-gray-300 text-lg">Fair launch with no presale</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl mt-1">✓</span>
                <p className="text-gray-300 text-lg">Liquidity locked for community safety</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl mt-1">✓</span>
                <p className="text-gray-300 text-lg">Built on Solana for fast, low-cost transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
