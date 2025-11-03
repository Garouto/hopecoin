import Image from "next/image"

export function AboutSection() {
  return (
    <section className="relative bg-[#0a0a0f] py-20 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#ffcc4d] rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#7c3aed] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Floating monk with decorative elements */}
              <div className="relative z-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ncDHHYBCrv0g9DscrSBtxIylt620lH.png"
                  alt="Hope Coin Monk"
                  width={400}
                  height={400}
                  className="animate-float drop-shadow-2xl"
                />
              </div>

              {/* Orbital rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#ffcc4d]/20 rounded-full animate-spin-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#7c3aed]/20 rounded-full animate-spin-slower" />

              {/* Floating icons */}
              <div className="absolute top-10 left-10 w-12 h-12 bg-[#ffcc4d]/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#ffcc4d]/30 animate-float-delayed">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute top-20 right-10 w-12 h-12 bg-[#7c3aed]/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#7c3aed]/30 animate-float">
                <span className="text-2xl">🙏</span>
              </div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#14f195]/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#14f195]/30 animate-float-delayed">
                <span className="text-2xl">💫</span>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#ffcc4d] text-sm font-medium tracking-wider">[CHAPTER:01]</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                WHAT IS{" "}
                <span className="text-[#ffcc4d] relative">
                  HOPE COIN
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ffcc4d]" />
                </span>
                ?
              </h2>
            </div>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                In the ever-evolving realm of cryptocurrency, where volatility meets opportunity, Hope Coin emerges as a
                beacon of light. This spiritual token embodies the peaceful wisdom of a meditating monk, bringing
                serenity and purpose to the digital asset space.
              </p>
              <p>
                Hope Coin's mission is simple yet profound: to be your companion through the crypto journey, offering
                stability in chaos and faith in uncertain times. With each sunrise comes new possibilities, and Hope
                Coin delivers that promise of renewal to every holder. Built on the Solana blockchain, it combines
                lightning-fast transactions with the timeless values of patience, hope, and prosperity.
              </p>
              <p className="text-[#ffcc4d] font-medium">
                No market is too turbulent, no dream too distant for Hope Coin's unwavering belief in a brighter
                tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
