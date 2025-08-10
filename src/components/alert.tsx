"use client"

import { motion } from "framer-motion"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"

interface AlertProps {
    onClose: () => void
    message: string
}

export default function Alert({ onClose, message }: AlertProps) {
    return (
        <motion.div
            className="absolute inset-0 z-[60] flex items-center justify-center min-h-screen p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-[400px] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md border-dashed border-4 border-pink-300 p-8 rounded-3xl shadow-2xl text-center"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-bold text-pink-600 mb-4">A Special Message!</h2>
                <p className="text-pink-600/70 text-lg font-medium leading-relaxed whitespace-pre-line mb-6">{message}</p>
                <Button isName="Got it!" icon={ArrowRight} onClick={onClose} color="primary" />
            </motion.div>
        </motion.div>
    )
}