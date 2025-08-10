"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "../button"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { Loader } from "@/components/loader"
import ImageSlider from "./image-slider"

interface LovedCardProps {
    onClose: () => void
}

export default function LovedCard({ onClose }: LovedCardProps) {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [isLoved, setIsLoved] = useState(true)

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                setIsLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 3000))

                const res = await fetch("/api/message")
                const data = await res.json()
                setMessage(data.message)
            } catch (error) {
                setMessage("Error loading message. But I still love you! ❤️")
            } finally {
                setIsLoading(false)
            }
        }

        fetchMessage()
    }, [])

    return (
        <>
            <AnimatePresence>
                {isImageLoading && <ImageSlider onClose={() => setIsImageLoading(false)} />}
                {isLoved && (
                    <motion.div
                        className="absolute inset-0 z-50 flex items-center justify-center min-h-screen p-4 bg-black/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="w-[560px] h-max flex flex-col items-center justify-center bg-white/90 backdrop-blur-md border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-4 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                                </motion.div>

                                <h1 className="text-4xl font-bold text-pink-600 text-center">I Love You Too!</h1>
                                <p className="text-center text-pink-600/70 text-lg font-medium">
                                    Thank you for loving me, I will cherish you forever.
                                </p>
                            </motion.div>

                            <motion.div
                                className="flex flex-col w-full h-[400px] border-2 border-pink-200/50 rounded-3xl bg-gradient-to-br from-pink-50/50 to-purple-50/50 backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <div className="flex flex-col items-start gap-4 p-6 overflow-y-auto scrollbar-hide h-full">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            >
                                                <Sparkles className="w-8 h-8 text-pink-400" />
                                            </motion.div>
                                            <div className="text-center">
                                                <p className="text-pink-600/70 text-lg font-medium mb-2">Loading our special message...</p>
                                                <div className="flex justify-center">
                                                    <Loader size={24} />
                                                </div>
                                            </div>

                                            <div className="w-full space-y-3">
                                                {[...Array(4)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="h-4 bg-pink-200/50 rounded-full"
                                                        style={{ width: `${Math.random() * 40 + 60}%` }}
                                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            delay: i * 0.2,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.p
                                            className="text-start text-pink-600/70 text-lg font-medium leading-relaxed"
                                            style={{ whiteSpace: "pre-line" }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {message}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-center gap-4 mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Button
                                    isName="Image"
                                    icon={ArrowRight}
                                    onClick={() => {
                                        setIsLoved(false); // Hide the loved card
                                        setIsImageLoading(true); // Show the image slider
                                    }}
                                    color="secondary"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}