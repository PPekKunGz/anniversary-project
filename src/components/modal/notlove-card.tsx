"use client"

import { HeartCrack, ArrowRight } from "lucide-react"
import { Button } from "../button"
import Image from "next/image"
import { motion } from "framer-motion"

interface NotLovedCardProps {
    onClose: () => void
}

export default function NotLovedCard({ onClose }: NotLovedCardProps) {
    return (
        <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center min-h-screen p-4 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="w-56 h-56 mb-5 rounded-2xl border-4 border-dashed border-pink-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image src="/0ef8be9e7c19661960e9c7f7989e8e3c.jpg" alt="logo" width={256} height={256} className="w-full h-full object-cover rounded-2xl" />
                </motion.div>

                <div className="flex flex-col items-center gap-3 mb-2">
                    <motion.div
                        animate={{
                            rotate: [0, -10, 10, 0],
                            scale: [1, 0.9, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <HeartCrack className="w-10 h-10 text-pink-400" />
                    </motion.div>
                    <p className="text-center text-pink-600/50 text-2xl font-medium">
                        You didn't love me, I know it's hard, but I promise you'll do better next time!
                    </p>
                </div>

                <motion.div
                    className="flex items-center justify-center gap-4 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button isName="Try Again" icon={ArrowRight} onClick={onClose} color="primary" />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
