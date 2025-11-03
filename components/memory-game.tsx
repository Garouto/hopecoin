"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

const gameImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-atVICPlSTNGk24yeY7g0W7WKBoVcEl.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-TGTWKqs9CN3XADiyJbQNdNhXfBdVdg.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-ylf2ytav4bcAWMDPy81Sh4A8pzPO7n.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-w33AuLaO8F86Si90SCyzhn7G5FwOVT.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img5-tRMrHRXZwYF5HHtg1IfYSQRhQkkDBM.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img6-iX6rs2y3fgbqtXSuR3tcDhpdBrgoPG.png",
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

interface LeaderboardEntry {
  id: string
  nickname: string
  moves: number
  created_at: string
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
  const [showNicknameModal, setShowNicknameModal] = useState(false)
  const [nickname, setNickname] = useState("")
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isDatabaseReady, setIsDatabaseReady] = useState(false)
  const [databaseError, setDatabaseError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchLeaderboard()

    if (isDatabaseReady) {
      const channel = supabase
        .channel("leaderboard-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "leaderboard",
          },
          () => {
            console.log("[v0] New leaderboard entry detected, refreshing...")
            fetchLeaderboard()
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [isDatabaseReady])

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

  useEffect(() => {
    if (matchedPairs === 6 && moves > 0) {
      setTimeout(() => {
        setShowNicknameModal(true)
      }, 500)
    }
  }, [matchedPairs, moves])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("moves", { ascending: true })
        .order("created_at", { ascending: true })
        .limit(10)

      if (error) {
        console.error("[v0] Error fetching leaderboard:", error)
        if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
          setDatabaseError("Database table not set up yet. Please run the SQL script in the scripts folder.")
          setIsDatabaseReady(false)
        }
        return
      }

      if (data) {
        console.log("[v0] Leaderboard fetched:", data)
        setLeaderboard(data)
        setIsDatabaseReady(true)
        setDatabaseError(null)
      }
    } catch (error) {
      console.error("[v0] Error fetching leaderboard:", error)
      setIsDatabaseReady(false)
    }
  }

  const saveToLeaderboard = async (playerNickname: string, playerMoves: number) => {
    if (!isDatabaseReady) {
      console.log("[v0] Database not ready, skipping save")
      setShowNicknameModal(false)
      return
    }

    try {
      const { error } = await supabase.from("leaderboard").insert({
        nickname: playerNickname,
        moves: playerMoves,
      })

      if (error) {
        console.error("[v0] Error saving to leaderboard:", error)
        return
      }

      console.log("[v0] Score saved successfully!")
      await fetchLeaderboard()
    } catch (error) {
      console.error("[v0] Error saving to leaderboard:", error)
    }
  }

  const initializeGame = () => {
    console.log("[v0] Initializing game")
    const pairs = gameImages.slice(0, 6)
    const cardPairs = [...pairs, ...pairs]

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
    setShowLeaderboard(false)
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

  const handleNicknameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nickname.trim()) {
      await saveToLeaderboard(nickname, moves)
      setShowNicknameModal(false)
    }
  }

  return (
    <section className="relative py-12 px-4 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="fixed pointer-events-none animate-coin-fall z-50"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
          }}
        >
          <Image src="/images/design-mode/coin(1).png" alt="Coin" width={80} height={80} className="drop-shadow-2xl" />
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
              Pairs: <span className="font-bold">{matchedPairs}/6</span>
            </div>
          </div>
          {isDatabaseReady && (
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="mt-4 px-4 py-2 text-sm bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors border border-purple-500/30"
            >
              {showLeaderboard ? "Hide" : "Show"} Leaderboard
            </button>
          )}
          {databaseError && (
            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-amber-400 text-sm mb-2">⚠️ Leaderboard Setup Required</p>
              <p className="text-gray-400 text-xs">
                Run the SQL script <code className="text-amber-400">scripts/001_create_leaderboard.sql</code> to enable
                the global leaderboard feature.
              </p>
            </div>
          )}
        </div>

        {showLeaderboard && isDatabaseReady && leaderboard.length > 0 && (
          <div className="mb-8 bg-gradient-to-br from-purple-900/30 to-amber-900/20 rounded-xl border border-amber-400/30 p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">🏆 Global Leaderboard</h3>
            <p className="text-gray-400 text-sm text-center mb-4">Live rankings from all players worldwide</p>
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between bg-background/50 rounded-lg p-3 border border-amber-400/20"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-bold ${
                        index === 0
                          ? "text-amber-400"
                          : index === 1
                            ? "text-gray-300"
                            : index === 2
                              ? "text-amber-600"
                              : "text-gray-500"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-white font-medium">{entry.nickname}</span>
                  </div>
                  <div className="text-amber-400 font-bold">{entry.moves} moves</div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {matchedPairs === 6 && !isDatabaseReady && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-background border-2 border-amber-400 rounded-2xl p-8 max-w-md w-full animate-fade-in">
              <h3 className="text-3xl font-bold text-amber-400 mb-4 text-center">Congratulations!</h3>
              <p className="text-white text-center mb-2">You completed the game in</p>
              <p className="text-4xl font-bold text-amber-400 text-center mb-6">{moves} moves</p>
              <p className="text-gray-400 text-sm text-center mb-6">
                Set up the database to save your score to the global leaderboard!
              </p>
              <button
                onClick={initializeGame}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-background font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-400/30"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      {showNicknameModal && isDatabaseReady && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-background border-2 border-amber-400 rounded-2xl p-8 max-w-md w-full animate-fade-in">
            <h3 className="text-3xl font-bold text-amber-400 mb-4 text-center">Congratulations!</h3>
            <p className="text-white text-center mb-2">You completed the game in</p>
            <p className="text-4xl font-bold text-amber-400 text-center mb-6">{moves} moves</p>
            <form onSubmit={handleNicknameSubmit} className="space-y-4">
              <div>
                <label htmlFor="nickname" className="block text-gray-300 mb-2 text-sm">
                  Enter your nickname for the leaderboard:
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={20}
                  placeholder="Your nickname"
                  className="w-full px-4 py-3 bg-background/50 border border-amber-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!nickname.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-background font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Save Score
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNicknameModal(false)
                    initializeGame()
                  }}
                  className="px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-colors"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
