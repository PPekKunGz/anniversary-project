"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from "@/components/loader"
import Alert from "../alert"

interface ImageSliderProps {
    onClose: () => void
}

const images = [
    { src: "/AQP6IhasfsrOuQnQPaaT1lroYkad7-kCnWkzvnH9AVHdkGpXWoAwjVZIJFSawSB4uP6aNqRfU0A3JSyqZKQ2paW8PjvroqIjsKb-oJo.mp4", alt: "Mochi Mochi With you" },
]

export default function ImageSlider({ onClose }: ImageSliderProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageLoading, setImageLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        setImageLoading(true)
    }, [currentImageIndex])

    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const nextImage = () => {
        setImageLoading(true)
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
        setImageLoading(true)
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const handleAlertClick = () => {
        setShowAlert(true)
    }

    const alertMessage = `❔ Why is there only one image in this timeline?
⌚ Because when I'm with you, I don't want to take more pictures,
❤️ I want to spend the moment with you.`

    const isVideo = (src: string) => src.endsWith('.mp4')

    return (
        <>
            <AnimatePresence>
                {showAlert && <Alert onClose={() => setShowAlert(false)} message={alertMessage} />}
            </AnimatePresence>

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
                    <div className="flex flex-col items-center gap-3 mb-6">
                        <h1 className="text-3xl font-bold text-pink-600/70">Image Timeline</h1>
                        <p className="text-center text-pink-600/50 text-lg font-medium">Here are some images we took together.</p>
                    </div>

                    <div className="relative w-full h-[350px] rounded-3xl overflow-hidden border-4 border-pink-300 mb-6 flex items-center justify-center">
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <Loader size={48} className="text-pink-500" />
                            </div>
                        )}
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                {isVideo(images[currentImageIndex].src) ? (
                                    <video
                                        src={images[currentImageIndex].src}
                                        className="w-full h-full object-cover rounded-3xl"
                                        controls
                                        autoPlay
                                        loop
                                        onLoadedData={handleImageLoad}
                                    />
                                ) : (
                                    <Image
                                        src={images[currentImageIndex].src || "/placeholder.svg"}
                                        alt={images[currentImageIndex].alt}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-3xl"
                                        onLoad={handleImageLoad}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-3xl">
                            <motion.button
                                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                                onClick={handleAlertClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Click
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Button isName="Close" icon={ArrowRight} onClick={onClose} color="primary" />
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}
