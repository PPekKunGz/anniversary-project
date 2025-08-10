"use client"

import { ArrowRight, Heart, Calendar, Clock } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import { motion } from "framer-motion"

interface MainCardProps {
    onClose: () => void
    startDate: string
    monthsTogether: number
    extraDays: number
}

export default function MainCard({ onClose, startDate, monthsTogether, extraDays }: MainCardProps) {
    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
                className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    className="w-56 h-56 mb-5 rounded-md border-4 border-dashed border-pink-300 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image src="/a4879e834ee3908080c4654b63b9dc3a.jpg" alt="logo" width={256} height={256} className="w-full h-full object-cover rounded-md" />
                </motion.div>

                <div className="mb-4 tracking-widest flex flex-col items-center justify-center gap-2 text-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mb-2" />
                    </motion.div>

                    <h1 className="text-pink-500 uppercase [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-3xl font-bold">
                        Happy Anniversary, My Love
                    </h1>

                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-pink-800/70" />
                        <span className="text-pink-800/70 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg">
                            we have been together for {monthsTogether} months and {extraDays} days
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-pink-800/70" />
                        <span className="text-pink-800/70 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg">
                            we started on {startDate}
                        </span>
                    </div>

                    <motion.span
                        className="text-pink-800/30 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        I will always love you more than words can say
                    </motion.span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button isName="Get Started" icon={ArrowRight} onClick={() => onClose()} />
                </motion.div>

                <motion.h1
                    className="text-black/20 uppercase text-sm font-medium mt-2"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    Click the button below to get started
                </motion.h1>
            </motion.div>
        </div>
    )
}
