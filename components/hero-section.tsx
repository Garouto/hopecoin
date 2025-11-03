"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Sunrise Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a40] via-[#7c3aed]/20 to-[#0a0a0f]" />

        {/* Sun glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffcc4d] rounded-full blur-[150px] opacity-30 animate-pulse-glow" />

        {/* Animated light rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-rays absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 h-[2px] w-[200%] origin-left"
                style={{
                  background: `linear-gradient(90deg, transparent, #ffcc4d, transparent)`,
                  transform: `rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Back mountain */}
          <div className="absolute bottom-0 left-0 right-0 h-[300px]">
            <svg viewBox="0 0 1440 300" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,150 Q360,50 720,100 T1440,120 L1440,300 L0,300 Z" fill="url(#gradient1)" opacity="0.3" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#1a1a40" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Front mountain */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px]">
            <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,100 Q360,20 720,60 T1440,80 L1440,200 L0,200 Z" fill="url(#gradient2)" opacity="0.5" />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffcc4d" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(#ffcc4d 1px, transparent 1px),
              linear-gradient(90deg, #ffcc4d 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Horizon glow lines */}
        <div className="absolute bottom-[200px] left-0 right-0 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-[1px] mx-auto rounded-full"
              style={{
                width: `${90 - i * 15}%`,
                background: `linear-gradient(90deg, transparent, #ffcc4d, transparent)`,
                opacity: 0.3 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/design-mode/favicon.png"
              alt="HOPE COIN Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-[#ffcc4d]">HOPE COIN</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#ffcc4d] hover:text-[#14f195] transition-colors z-50"
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground hover:text-[#ffcc4d] transition-colors">
              About
            </a>
            <a href="#how-to-buy" className="text-foreground hover:text-[#ffcc4d] transition-colors">
              How to buy?
            </a>
            <a href="#tokenomics" className="text-foreground hover:text-[#ffcc4d] transition-colors">
              Tokenomics
            </a>
            <Button className="bg-[#f5f5f0] text-[#0a0a0f] hover:bg-[#ffcc4d] hover:text-[#0a0a0f] font-bold px-8">
              BUY NOW
            </Button>
          </nav>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-sm z-40 md:hidden flex items-center justify-center">
            <nav className="flex flex-col items-center gap-8 text-center">
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f0] text-3xl font-bold hover:text-[#ffcc4d] transition-colors"
              >
                About
              </a>
              <a
                href="#how-to-buy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f0] text-3xl font-bold hover:text-[#ffcc4d] transition-colors"
              >
                How to buy?
              </a>
              <a
                href="#tokenomics"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f0] text-3xl font-bold hover:text-[#ffcc4d] transition-colors"
              >
                Tokenomics
              </a>
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#f5f5f0] text-[#0a0a0f] hover:bg-[#ffcc4d] hover:text-[#0a0a0f] font-bold px-12 py-6 text-xl mt-4"
              >
                BUY NOW
              </Button>
            </nav>
          </div>
        )}

        {/* Hero Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 py-8 md:py-12">
          {/* Mobile/Tablet: Vertical stacked layout */}
          <div className="flex flex-col items-center text-center md:hidden w-full space-y-6">
            {/* Title */}
            <h1 className="text-[60px] sm:text-[80px] leading-none font-black text-[#f5f5f0] tracking-tight">
              HOPE COIN
            </h1>

            {/* Buy section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-[#ffcc4d]">BUY ON</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#ffcc4d]">RAYDIUM</p>
              </div>

              <Button className="bg-[#0a0a0f] text-[#f5f5f0] border-2 border-[#ffcc4d] hover:bg-[#ffcc4d] hover:text-[#0a0a0f] font-bold px-10 py-5 text-base">
                BUY NOW
              </Button>
            </div>

            {/* Tagline */}
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-[#ffcc4d]">HOPE FOR</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#ffcc4d]">A NEW DAWN</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 justify-center">
              <a
                href="https://x.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
              >
                <Image
                  src="/images/design-mode/twitter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://t.me/hopecoin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
              >
                <Image
                  src="/images/design-mode/telegram.png"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://dexscreener.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
              >
                <Image
                  src="/images/design-mode/dexscreener.png"
                  alt="DexScreener"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.dextools.io/app/en/meme-board"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
              >
                <Image
                  src="/images/design-mode/dextools.png"
                  alt="DexTools"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://raydium.io/swap/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
              >
                <Image
                  src="/images/design-mode/raydium.jpg"
                  alt="Raydium"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

            {/* Logo - larger on mobile */}
            <div className="animate-float pt-4">
              <Image
                src="/images/design-mode/logo(6).png"
                alt="HOPE COIN Meditation Monk"
                width={320}
                height={320}
                className="drop-shadow-[0_0_50px_rgba(255,204,77,0.5)] w-[280px] sm:w-[320px]"
              />
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex items-center justify-between gap-12 w-full">
            {/* Left side */}
            <div className="flex-1 space-y-8">
              <h1 className="text-[120px] leading-none font-black text-[#f5f5f0] tracking-tight">HOPE COIN</h1>

              <div className="space-y-2">
                <p className="text-4xl font-bold text-[#ffcc4d]">HOPE FOR</p>
                <p className="text-4xl font-bold text-[#ffcc4d]">A NEW DAWN</p>
              </div>

              {/* Social icons */}
              <div className="flex gap-4">
                <a
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
                >
                  <Image
                    src="/images/design-mode/twitter.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="https://t.me/hopecoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
                >
                  <Image
                    src="/images/design-mode/telegram.png"
                    alt="Telegram"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="https://dexscreener.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
                >
                  <Image
                    src="/images/design-mode/dexscreener.png"
                    alt="DexScreener"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="https://www.dextools.io/app/en/meme-board"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg border-2 border-[#ffcc4d] flex items-center justify-center hover:bg-[#ffcc4d] transition-colors p-2.5"
                >
                  <Image
                    src="/images/design-mode/dextools.png"
                    alt="DexTools"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </a>
                
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex-shrink-0 animate-float">
              <Image
                src="/images/design-mode/logo(5).png"
                alt="HOPE COIN Meditation Monk"
                width={400}
                height={400}
                className="drop-shadow-[0_0_50px_rgba(255,204,77,0.5)]"
              />
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col items-end space-y-8">
              <div className="text-right space-y-2">
                <p className="text-4xl font-bold text-[#ffcc4d]">BUY ON</p>
                <p className="text-4xl font-bold text-[#ffcc4d]">RAYDIUM</p>
              </div>

              <Button className="bg-[#0a0a0f] text-[#f5f5f0] border-2 border-[#ffcc4d] hover:bg-[#ffcc4d] hover:text-[#0a0a0f] font-bold px-12 py-6 text-lg">
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
