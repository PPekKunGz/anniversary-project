"use client"

import { motion } from "framer-motion"

interface LoaderProps {
  size?: number
  className?: string
}

export function Loader({ size = 24, className = "" }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 border-2 border-gray-700 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            borderTopColor: "rgb(236 72 153)",
            borderRightColor: "transparent",
          }}
        />
      </motion.div>
    </div>
  )
}
