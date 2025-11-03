"use client"

import Image from "next/image"
import { useState } from "react"

export function LogoCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const baseLogos = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-TGTWKqs9CN3XADiyJbQNdNhXfBdVdg.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img8-78Er2SyCt1MXJKcZnB88S5O5N6bCGU.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img7-maWQtWDb6yjQ8G9Dqch0zKBlTB26Ii.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-atVICPlSTNGk24yeY7g0W7WKBoVcEl.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img10-vK08sXH66hm91H4WtcxsltavUo41Bo.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img5-tRMrHRXZwYF5HHtg1IfYSQRhQkkDBM.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-ylf2ytav4bcAWMDPy81Sh4A8pzPO7n.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img9-koLKajyVe3s2W8lAaaRdjRf2yQprUJ.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img6-iX6rs2y3fgbqtXSuR3tcDhpdBrgoPG.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-w33AuLaO8F86Si90SCyzhn7G5FwOVT.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-atVICPlSTNGk24yeY7g0W7WKBoVcEl.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img8-78Er2SyCt1MXJKcZnB88S5O5N6bCGU.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img6-iX6rs2y3fgbqtXSuR3tcDhpdBrgoPG.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-TGTWKqs9CN3XADiyJbQNdNhXfBdVdg.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img10-vK08sXH66hm91H4WtcxsltavUo41Bo.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img7-maWQtWDb6yjQ8G9Dqch0zKBlTB26Ii.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img5-tRMrHRXZwYF5HHtg1IfYSQRhQkkDBM.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img9-koLKajyVe3s2W8lAaaRdjRf2yQprUJ.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-ylf2ytav4bcAWMDPy81Sh4A8pzPO7n.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-w33AuLaO8F86Si90SCyzhn7G5FwOVT.png",
  ]

  // Duplicate the array to create seamless loop
  const logos = [...baseLogos, ...baseLogos]

  return (
    <section className="w-full bg-[#0a0a0f] py-12 overflow-hidden border-t border-[#ffcc4d]/20">
      <div className="relative">
        <div
          className="flex gap-6 animate-scroll-seamless"
          style={{
            animationPlayState: hoveredIndex !== null ? "paused" : "running",
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-all duration-300 ease-out"
              style={{
                transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)",
                zIndex: hoveredIndex === index ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-[130px] h-[130px] rounded-xl border-[3px] border-[#ffcc4d]/40 overflow-hidden bg-gradient-to-br from-[#7c3aed]/20 to-black/50 backdrop-blur-sm hover:border-[#ffcc4d] hover:shadow-[0_0_25px_rgba(255,204,77,0.6)] transition-all duration-300 p-1">
                <div className="w-full h-full rounded-lg overflow-hidden border border-[#ffcc4d]/20">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`Partner logo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
