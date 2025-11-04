"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function FooterSection() {
  const socialLinks = [
    {
      name: "Twitter",
      icon: "/images/design-mode/twitter.png",
      url: "https://x.com/i/communities/1985170653184450945",
    },
    {
      name: "Telegram",
      icon: "/images/design-mode/telegram.png",
      url: "https://t.me/hopecoinportal",
    },
    {
      name: "DexScreener",
      icon: "/images/design-mode/dexscreener.png",
      url: "https://dexscreener.com/solana/8KgWm5DMLiXvxn5J7TxzKfUvuzq6RonS3eAd9H9jnqHn",
    },
    {
      name: "DexTools",
      icon: "/images/design-mode/dextools.png",
      url: "https://www.dextools.io/app/en/meme-board",
    },
  ]

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "How to buy?", href: "#how-to-buy" },
    { name: "Tokenomics", href: "#tokenomics" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-black via-purple-950/20 to-amber-950/30 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing horizon lines */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="none"
              stroke="rgba(251, 191, 36, 0.2)"
              strokeWidth="2"
              d="M0,160 Q360,100 720,160 T1440,160"
              className="animate-pulse"
            />
            <path
              fill="none"
              stroke="rgba(251, 191, 36, 0.3)"
              strokeWidth="2"
              d="M0,200 Q360,140 720,200 T1440,200"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <path fill="rgba(217, 119, 6, 0.1)" d="M0,224 Q360,180 720,224 T1440,224 L1440,320 L0,320 Z" />
          </svg>
        </div>

        {/* Glowing dots */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="text-amber-500">HOPE COIN</span>
          </h2>
          <p className="text-3xl md:text-5xl font-black text-white leading-tight">
            THE DAWN IS JUST
            <br />
            THE BEGINNING
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-200 to-amber-100 hover:from-amber-300 hover:to-amber-200 text-black font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
          >
            BUY NOW
          </Button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-amber-500/50 bg-black/50 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 hover:scale-110 p-2.5"
              aria-label={social.name}
            >
              <Image
                src={social.icon || "/placeholder.svg"}
                alt={social.name}
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </Link>
          ))}
        </div>

        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-8 text-white text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-amber-400 transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">2025 © ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  )
}
