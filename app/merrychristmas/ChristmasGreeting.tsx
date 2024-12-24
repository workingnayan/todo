'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react'
import { ChristmasGreeting as ChristmasGreetingType } from '@/types/christmas-greeting'

export function ChristmasGreeting() {
    const [names, setNames] = useState<string[]>(['', ''])
    const [greetings, setGreetings] = useState<ChristmasGreetingType[]>([])
    const [showGreetings, setShowGreetings] = useState(false)

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...names]
        newNames[index] = value
        setNames(newNames)
    }

    const addNameField = () => {
        setNames([...names, ''])
    }

    const removeNameField = (index: number) => {
        if (names.length > 1) {
            const newNames = names.filter((_, i) => i !== index)
            setNames(newNames)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const validNames = names.filter(name => name.trim() !== '')
        if (validNames.length > 0) {
            const newGreetings: ChristmasGreetingType[] = validNames.map(name => ({
                id: Date.now() + Math.random(),
                name: name.trim()
            }))
            setGreetings(newGreetings)
            setShowGreetings(true)
        }
    }

    const resetForm = () => {
        setNames(['', ''])
        setGreetings([])
        setShowGreetings(false)
    }

    return (
        <div className="w-full max-w-md">
            {!showGreetings ? (
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 mb-6"
                >
                    {names.map((name, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                placeholder={`Enter name ${index + 1}`}
                                className="bg-white/90 placeholder-gray-500 flex-grow"
                            />
                            {index > 1 && (
                                <Button
                                    type="button"
                                    onClick={() => removeNameField(index)}
                                    variant="destructive"
                                    size="icon"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                            )}
                            {index === names.length - 1 && (
                                <Button
                                    type="button"
                                    onClick={addNameField}
                                    variant="secondary"
                                    size="icon"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Show Christmas Wishes
                    </Button>
                </motion.form>
            ) : (
                <div>
                    <AnimatePresence>
                        {greetings.map((greeting) => (
                            <motion.div
                                key={greeting.id}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/90 p-6 rounded-lg shadow-lg text-center mb-4"
                            >
                                <motion.h2
                                    className="text-3xl font-bold mb-4 text-red-700"
                                    animate={{ y: [0, -10, 0], color: ['#dc2626', '#16a34a', '#dc2626'] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                >
                                    Merry Christmas, {greeting.name}!
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <Button
                        onClick={resetForm}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                        Add More Names
                    </Button>
                </div>
            )}
        </div>
    )
}

