"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock } from "lucide-react"

interface LockedPassProps {
  isOpen: boolean
  onClose: () => void
} 

export default function LockedPass({ isOpen, onClose }: LockedPassProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "heartbeat") {
      onClose()
      setPassword("")
      setError("")
    } else {
      setError("Wrong password")
      setPassword("")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 w-[350px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Lock className="text-pink-400" size={24} />
                <h2 className="text-xl font-light text-gray-700">Locked Content</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Enter Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 font-medium"
              >
                Unlock
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">Hint: The song title is the password</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}