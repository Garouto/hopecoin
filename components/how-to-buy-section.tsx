"use client"

import Image from "next/image"

export function HowToBuySection() {
  const steps = [
    {
      id: "[S:01]",
      title: "PURCHASE SOLANA (SOL)",
      description: "Start by buying Solana (SOL) from a major centralized exchange, such as",
      link: "Coinbase.com",
      linkUrl: "https://www.coinbase.com",
      image: null,
      icon: "💰",
    },
    {
      id: "[S:02]",
      title: "SEND SOL TO A WALLET",
      description: "Transfer SOL you purchased to a decentralized wallet like",
      link: "Phantom",
      linkUrl: "https://phantom.app",
      image: null,
      icon: "👛",
    },
    {
      id: "[S:03]",
      title: "SWAP SOL FOR HOPE COIN",
      description: "Once your SOL is in your Phantom wallet, use Raydium to swap your SOL for HOPE COIN",
      link: "",
      linkUrl: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ncDHHYBCrv0g9DscrSBtxIylt620lH.png",
      icon: null,
    },
  ]

  return (
    <section className="relative py-20 px-6 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-gray-400 text-sm mb-4">[E:03]</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            HOW TO BUY <span className="text-[#ffcc4d]">HOPE COIN</span>
            <span className="text-white"> ?</span>
          </h2>
          <div className="h-1 bg-gradient-to-r from-[#ffcc4d] via-[#7c3aed] to-transparent"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0f] rounded-2xl p-6 border border-[#ffcc4d]/20 hover:border-[#ffcc4d]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,204,77,0.3)] overflow-hidden"
            >
              {/* Step Label */}
              <p className="text-gray-400 text-sm mb-4">{step.id}</p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{step.title}</h3>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#ffcc4d] to-transparent mb-4"></div>

              {/* Description */}
              <p className="text-gray-400 text-base mb-6 leading-relaxed">
                {step.description}{" "}
                {step.link && (
                  <a
                    href={step.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffcc4d] hover:text-[#14f195] underline transition-colors"
                  >
                    {step.link}
                  </a>
                )}
                .
              </p>

              <div className="relative h-48 mt-auto flex items-center justify-center">
                {step.image && (
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={150}
                    height={150}
                    className="object-contain animate-float transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                {/* Decorative circles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-[#ffcc4d]/20 rounded-full animate-pulse-glow"></div>
                  <div
                    className="absolute bottom-8 left-8 w-8 h-8 border border-[#7c3aed]/30 rounded-full animate-pulse-glow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ffcc4d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ffcc4d]/5 rounded-full blur-3xl"></div>
    </section>
  )
}
