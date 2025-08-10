"use client"

import { ArrowRight, Heart } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import { useState } from "react"
import NotLovedCard from "./modal/notlove-card"
import LovedCard from "./modal/love-card"
import { motion, AnimatePresence } from "framer-motion"

export default function QuestionCard() {
    const [isLoved, setIsLoved] = useState(false)
    const [isNotLoved, setIsNotLoved] = useState(false)

    const handleLoveClick = () => {
        setIsNotLoved(false)
        setIsLoved(true)
    }

    const handleNotLoveClick = () => {
        setIsLoved(false)
        setIsNotLoved(true)
    }

    return (
        <>
            <AnimatePresence>
                {isLoved && <LovedCard onClose={() => setIsLoved(false)} />}
                {isNotLoved && <NotLovedCard onClose={() => setIsNotLoved(false)} />}
            </AnimatePresence>

            <motion.div
                className="relative z-10 flex items-center justify-center min-h-screen p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="mb-5 rounded-2xl border-4 border-dashed border-pink-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/81045d90f4fbd98c9775099c867b1d19.jpg"
                            alt=""
                            width={100}
                            height={100}
                            className="w-[300px] h-[300px] object-cover rounded-2xl"
                        />
                    </motion.div>

                    <div className="flex flex-col items-center gap-3 mb-2">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-pink-600">Do you lovee me?</h1>
                        <p className="text-center text-pink-600/50 text-lg font-medium -translate-y-2">
                            I lovee you, and I will always do so.
                        </p>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Button isName="Lovee" icon={ArrowRight} onClick={handleLoveClick} color="primary" />
                        <Button isName="Not Lovee" icon={ArrowRight} onClick={handleNotLoveClick} color="secondary" />
                    </motion.div>

                    <motion.button
                        className="w-full mt-4 text-pink-400 hover:text-pink-600 transition-colors duration-300"
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        </>
    )
}
