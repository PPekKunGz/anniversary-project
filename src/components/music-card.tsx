"use client"

import type React from "react"
import { Play, Pause, VolumeX, Volume1, Volume2, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LockedPass from "./locked-pass"
// if you think oh this code is ai generated. yes! i use on this page.

// YouTube Player API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any
  }
}

export default function MainCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(253) // 4:13 in seconds
  const [volume, setVolume] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const [showLockedPass, setShowLockedPass] = useState(false)
  const playerRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const longPressStartRef = useRef<number>(0)

  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: "P5sHZRicEXg", // https://youtu.be/P5sHZRicEXg?si=y3Vzfdl3fLzFbiP7
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            console.log("[v0] YouTube player ready")
            event.target.setVolume(volume)
            setDuration(event.target.getDuration())
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              startProgressTracking()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              stopProgressTracking()
            }
          },
        },
      })
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startProgressTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && !isDragging) {
        setCurrentTime(playerRef.current.getCurrentTime())
      }
    }, 1000)
  }

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const togglePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const decreaseVolume = () => {
    if (!playerRef.current) return
    const newVolume = Math.max(0, volume - 20)
    setVolume(newVolume)
    playerRef.current.setVolume(newVolume)
  }

  const increaseVolume = () => {
    if (!playerRef.current) return
    const newVolume = Math.min(100, volume + 20)
    setVolume(newVolume)
    playerRef.current.setVolume(newVolume)
  }

  const seekToPosition = (clientX: number) => {
    if (!progressBarRef.current || !playerRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newTime = percentage * duration

    playerRef.current.seekTo(newTime, true)
    setCurrentTime(newTime)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    seekToPosition(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      seekToPosition(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handlePlayMouseDown = () => {
    longPressStartRef.current = Date.now()
    setIsLongPressing(true)

    longPressTimerRef.current = setTimeout(() => {
      setShowLockedPass(true)
      setIsLongPressing(false)
    }, 5000)
  }

  const handlePlayMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }

    const pressDuration = Date.now() - longPressStartRef.current

    if (pressDuration < 5000) {
      // Normal click - toggle play/pause
      togglePlayPause()
    }

    setIsLongPressing(false)
  }

  const handlePlayMouseLeave = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
    setIsLongPressing(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />
    if (volume < 50) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  return (
    <AnimatePresence>
      {!showLockedPass && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative flex justify-center items-center w-full h-full min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300"
        >
          <div id="youtube-player" style={{ display: "none" }}></div>

          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={`bg-star-${i}-${i * 1000}`}
                className="absolute text-white/60 text-xs animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              >
                ✦
              </div>
            ))}
          </div>

          <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 w-[400px] shadow-2xl">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-orange-300"></div>
              <div className="w-3 h-3 rounded-full bg-pink-300"></div>
              <div className="w-3 h-3 rounded-full bg-purple-300"></div>
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            </div>

            <div className="relative mb-6">
              <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-pink-300 via-pink-400 to-purple-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 relative overflow-hidden">
                    <div className="absolute top-4 left-6 w-16 h-2 bg-pink-400/50 rounded-full"></div>
                    <div className="absolute top-8 right-4 w-12 h-1 bg-pink-400/50 rounded-full"></div>
                    <div className="absolute bottom-6 left-8 w-8 h-1 bg-pink-400/50 rounded-full"></div>
                  </div>
                </div>

                {[...Array(8)].map((_, i) => (
                  <div
                    key={`album-star-${i}-${i * 1000}`}
                    className="absolute text-white/80 text-sm animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    ✦
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-light text-pink-400 tracking-[0.5em]">welcome babe</h2>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div ref={progressBarRef} className="relative cursor-pointer" onMouseDown={handleMouseDown}>
                <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                <div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <div
                  className={`absolute top-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ${isDragging ? "scale-125" : "hover:scale-110"}`}
                  style={{ left: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8">
              <button
                onClick={decreaseVolume}
                className="p-2 text-gray-400 hover:text-pink-400 transition-colors"
                title={`Volume: ${volume}%`}
              >
                {getVolumeIcon()}
              </button>

              <motion.button
                onMouseDown={handlePlayMouseDown}
                onMouseUp={handlePlayMouseUp}
                onMouseLeave={handlePlayMouseLeave}
                onTouchStart={handlePlayMouseDown}
                onTouchEnd={handlePlayMouseUp}
                className="p-3 text-pink-400 hover:text-pink-500 transition-colors relative"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isLongPressing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    duration: isLongPressing ? 5 : 0.3,
                    ease: isLongPressing ? "linear" : "easeOut",
                    repeat: isLongPressing ? Number.POSITIVE_INFINITY : 0,
                  }}
                >
                  {isLongPressing ? (
                    <Heart size={28} fill="currentColor" />
                  ) : isPlaying ? (
                    <Pause size={28} fill="currentColor" />
                  ) : (
                    <Play size={28} fill="currentColor" />
                  )}
                </motion.div>
              </motion.button>

              <button
                onClick={increaseVolume}
                className="p-2 text-gray-400 hover:text-pink-400 transition-colors"
                title={`Volume: ${volume}%`}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <LockedPass isOpen={showLockedPass} onClose={() => setShowLockedPass(false)} />
    </AnimatePresence>
  )
}
