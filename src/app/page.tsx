"use client"

import { useState } from "react"
import QuestionCard from "@/components/question-card"
import MainCard from "@/components/main-card"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
    const firstDate = new Date("2025-04-11")
    const currentDate = new Date()

    const [isOpen, setIsOpen] = useState(false)

    // คำนวณจำนวนเดือนที่คบกัน
    const yearDiff = currentDate.getFullYear() - firstDate.getFullYear()
    const monthDiff = currentDate.getMonth() - firstDate.getMonth()

    let totalMonths = yearDiff * 12 + monthDiff
    if (currentDate.getDate() < firstDate.getDate()) {
        totalMonths -= 1
    }
    if (totalMonths < 0) totalMonths = 0

    // คำนวณจำนวนวันเกินจากเดือนเต็ม
    let extraDays = currentDate.getDate() - firstDate.getDate()
    if (extraDays < 0) {
        // หาเลขวันของเดือนก่อนหน้า
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
        extraDays = prevMonth.getDate() + extraDays
    }

    return (
        <motion.div className="relative h-screen w-screen bubblegum-sans-regular overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center blur z-0"
                animate={{ scale: isOpen ? 1.1 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 z-30 flex items-center justify-center"
                    >
                        <QuestionCard />
                    </motion.div>
                )}

                {!isOpen && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <MainCard
                            onClose={() => setIsOpen(true)}
                            startDate={firstDate.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            monthsTogether={totalMonths}
                            extraDays={extraDays}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
