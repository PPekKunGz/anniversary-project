"use client"

import type { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface ButtonProps {
    isName?: string
    onClick?: () => void
    icon?: LucideIcon
    href?: string
    color?: "primary" | "secondary"
}

export function Button({ isName, onClick, icon: Icon, href, color = "primary" }: ButtonProps) {
    const router = useRouter()

    const clickHandler = () => {
        if (onClick) onClick()
        if (href) router.push(href)
    }

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <motion.button
                    onClick={clickHandler}
                    className={`w-44 bg-gradient-to-r text-white font-medium py-3 px-8 rounded-3xl transition-colors duration-500 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm ${color === "primary"
                        ? "from-pink-400/70 to-pink-500 hover:from-pink-500 hover:to-pink-600"
                        : "from-teal-500/70 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                        }`}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    {isName}
                    {Icon && (
                        <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <Icon size={20} />
                        </motion.div>
                    )}
                </motion.button>
            </div>
        </div>
    )
}