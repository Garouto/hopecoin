"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const gameImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-atVICPlSTNGk24yeY7g0W7WKBoVcEl.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-TGTWKqs9CN3XADiyJbQNdNhXfBdVdg.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-ylf2ytav4bcAWMDPy81Sh4A8pzPO7n.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-w33AuLaO8F86Si90SCyzhn7G5FwOVT.png",
]

interface Card {
  id: number
  imageUrl: string
  isFlipped: boolean
  isMatched: boolean
}

interface CoinAnimation {
  id: number
  x: number
  y: number
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [firstCard, setFirstCard] = useState<number | null>(null)
  const [secondCard, setSecondCard] = useState<number | null>(null)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [coins, setCoins] = useState<CoinAnimation[]>([])
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  useEffect(() => {
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coin-wCOSkQ2Xci2xmyYe08SwRVposd1wpA.mp3",
    )
    audio.volume = 0.5
    audio.preload = "auto"

    audio.addEventListener("canplaythrough", () => {
      console.log("[v0] Audio loaded and ready")
    })

    audio.addEventListener("error", (e) => {
      console.error("[v0] Audio loading error:", e)
    })

    audio.load()
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      setIsChecking(true)
      setMoves((prev) => prev + 1)

      const firstCardData = cards[firstCard]
      const secondCardData = cards[secondCard]

      console.log("[v0] Checking match:", { firstCard, secondCard, firstCardData, secondCardData })

      if (firstCardData.imageUrl === secondCardData.imageUrl) {
        // Match found!
        console.log("[v0] Match found!")

        playMatchSound()
        showCoinAnimation()

        setTimeout(() => {
          setCards((prevCards) => {
            const newCards = [...prevCards]
            newCards[firstCard] = { ...newCards[firstCard], isMatched: true }
            newCards[secondCard] = { ...newCards[secondCard], isMatched: true }
            return newCards
          })
          setMatchedPairs((prev) => prev + 1)
          setFirstCard(null)
          setSecondCard(null)
          setIsChecking(false)
        }, 600)
      } else {
        // No match - flip back
        console.log("[v0] No match, flipping back")
        setTimeout(() => {
          setCards((prevCards) => {
            const newCards = [...prevCards]
            newCards[firstCard] = { ...newCards[firstCard], isFlipped: false }
            newCards[secondCard] = { ...newCards[secondCard], isFlipped: false }
            return newCards
          })
          setFirstCard(null)
          setSecondCard(null)
          setIsChecking(false)
        }, 1200)
      }
    }
  }, [firstCard, secondCard, cards])

  const initializeGame = () => {
    console.log("[v0] Initializing game")
    const pairs = gameImages.slice(0, 4)
    const cardPairs = [...pairs, ...pairs]

    // Shuffle cards
    const shuffled = cardPairs
      .map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFirstCard(null)
    setSecondCard(null)
    setMatchedPairs(0)
    setMoves(0)
    setIsChecking(false)
    setCoins([])
  }

  const handleCardClick = (index: number) => {
    const card = cards[index]

    console.log("[v0] Card clicked:", { index, card, isChecking, firstCard, secondCard })

    if (isChecking || card.isMatched || card.isFlipped || (firstCard !== null && secondCard !== null)) {
      console.log("[v0] Click blocked")
      return
    }

    if (audioRef.current && !audioUnlocked) {
      audioRef.current
        .play()
        .then(() => {
          audioRef.current!.pause()
          audioRef.current!.currentTime = 0
          setAudioUnlocked(true)
          console.log("[v0] Audio unlocked by user interaction")
        })
        .catch((err) => {
          console.log("[v0] Audio unlock failed:", err)
        })
    }

    setCards((prevCards) => {
      const newCards = [...prevCards]
      newCards[index] = { ...newCards[index], isFlipped: true }
      return newCards
    })

    if (firstCard === null) {
      console.log("[v0] Setting first card:", index)
      setFirstCard(index)
    } else if (secondCard === null && index !== firstCard) {
      console.log("[v0] Setting second card:", index)
      setSecondCard(index)
    }
  }

  const playMatchSound = () => {
    console.log("[v0] Attempting to play match sound, audioUnlocked:", audioUnlocked)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[v0] Audio played successfully!")
          })
          .catch((err) => {
            console.error("[v0] Audio play failed:", err)
          })
      }
    } else {
      console.error("[v0] Audio ref is null")
    }
  }

  const showCoinAnimation = () => {
    const newCoin: CoinAnimation = {
      id: Date.now(),
      x: Math.random() * 60 + 20,
      y: 30,
    }
    setCoins((prev) => [...prev, newCoin])

    setTimeout(() => {
      setCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id))
    }, 2000)
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="fixed pointer-events-none animate-coin-fall z-50"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coin-1zW1Ybi2CUhwHd7xYwg5wDOLqAtR9F.png"
            alt="Coin"
            width={80}
            height={80}
            className="drop-shadow-2xl"
          />
        </div>
      ))}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-sm font-mono mb-2">[E:05]</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">MEMORY </span>
            <span className="text-amber-400">GAME</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Find the matching pairs to collect HOPE COINS!</p>
          <div className="flex gap-6 justify-center mt-4 text-sm">
            <div className="text-amber-400">
              Moves: <span className="font-bold">{moves}</span>
            </div>
            <div className="text-purple-400">
              Pairs: <span className="font-bold">{matchedPairs}/4</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isMatched || isChecking}
              className="aspect-square relative group perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <div
                className={`w-full h-full relative transition-transform duration-700 preserve-3d ${
                  card.isFlipped || card.isMatched ? "[transform:rotateY(180deg)]" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl border-2 border-amber-400/30 bg-gradient-to-br from-purple-900/50 to-background flex items-center justify-center transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-400/20"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-5xl opacity-30 select-none">?</div>
                </div>

                <div
                  className={`absolute inset-0 rounded-xl border-2 ${
                    card.isMatched ? "border-green-400 shadow-lg shadow-green-400/30" : "border-amber-400"
                  } bg-gradient-to-br from-amber-400/10 to-purple-500/10 p-3 flex items-center justify-center`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={card.imageUrl || "/placeholder.svg"}
                      alt="Memory card"
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 25vw, 15vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {matchedPairs === 4 && (
          <div className="text-center animate-fade-in">
            <div className="text-2xl font-bold text-amber-400 mb-4 animate-pulse">
              Congratulations! You found all pairs in {moves} moves!
            </div>
            <button
              onClick={initializeGame}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-background font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-400/30"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
