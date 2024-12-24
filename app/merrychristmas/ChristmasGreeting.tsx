'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChristmasGreeting() {
    const [name, setName] = useState('')
    const [showGreeting, setShowGreeting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim()) {
            setShowGreeting(true)
        }
    }

    return (
        <div className="w-full max-w-md">
            {!showGreeting ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-white/90 placeholder-gray-500"
                    />

                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Get Your Christmas Greeting!
                    </Button>
                </form>
            ) : (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/90 p-6 rounded-lg shadow-lg text-center"
                >
                    <motion.h2
                        className="text-3xl font-bold mb-4 text-red-700"
                        animate={{ y: [0, -10, 0], color: ['#dc2626', '#16a34a', '#dc2626'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        Merry Christmas, {name}!
                    </motion.h2>
                    <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        🎄
                    </motion.div>
                    <p className="text-gray-700">Wishing you joy and happiness this holiday season!</p>
                    <motion.div className="mt-4 space-x-2">
                        {['❄️', '🎅', '🎁', '⛄'].map((emoji, index) => (
                            <motion.span
                                key={index}
                                className="inline-block text-2xl"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 1, delay: index * 0.2, repeat: Infinity }}
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </motion.div>
                    <Button
                        onClick={() => setShowGreeting(false)}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white"
                    >
                        Greet Another Person
                    </Button>
                </motion.div>
            )}
        </div>
    )
}

