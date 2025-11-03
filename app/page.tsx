import { HeroSection } from "@/components/hero-section"
import { LogoCarousel } from "@/components/logo-carousel"
import { AboutSection } from "@/components/about-section"
import { HowToBuySection } from "@/components/how-to-buy-section"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { MemoryGame } from "@/components/memory-game"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoCarousel />
      <AboutSection />
      <HowToBuySection />
      <TokenomicsSection />
      <MemoryGame />
      <FooterSection />
    </main>
  )
}
