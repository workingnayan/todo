'use client'

import {useState, useEffect, Suspense} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Fireworks} from './Fireworks'
import {useSearchParams} from "next/navigation";

export function SingleNewYearGreeting() {
    return (
        <Suspense fallback={<div> Loading ...</div>}>
            <FetchNewYearGreeting/>
        </Suspense>
    )
}

export function FetchNewYearGreeting() {
    const [name, setName] = useState<string>('')
    const [showGreeting, setShowGreeting] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchedName = searchParams.get("name")
        if (fetchedName) {
            console.log('fetched Name from url ---', fetchedName)
            setName(searchParams.get('name') || '')
            setShowGreeting(true)
        }

    }, [searchParams])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name) {
            console.log('submitted name ---', name)
            setShowGreeting(true)
        }
    }

    const resetForm = () => {
        setName('')
        setShowGreeting(false)
    }


    return (
        <div className="w-full max-w-md relative">
            {showGreeting && <Fireworks/>}
            {!showGreeting ? (
                <motion.form
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    onSubmit={handleSubmit}
                    className="space-y-4 mb-6"
                >
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter name'
                            className="bg-white/90 placeholder-gray-500 flex-grow"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Show New Year Wishes
                    </Button>
                </motion.form>
            ) : (
                <div>
                    <AnimatePresence>
                        <motion.div
                            initial={{scale: 0.5, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.5, opacity: 0}}
                            transition={{duration: 0.5}}
                            className="bg-white/90 p-6 rounded-lg shadow-lg text-center mb-4"
                        >
                            <motion.h2
                                className="text-3xl font-bold mb-4 text-blue-700"
                                animate={{y: [0, -10, 0], color: ['#1d4ed8', '#4338ca', '#1d4ed8']}}
                                transition={{duration: 2, repeat: Infinity, repeatType: "reverse"}}
                            >
                                Happy New Year, {name}!
                            </motion.h2>
                            <motion.div
                                className="text-5xl mb-4"
                                animate={{rotate: [0, 10, -10, 0]}}
                                transition={{duration: 1, repeat: Infinity}}
                            >
                                🎉
                            </motion.div>
                            <p className="text-gray-700">Wishing you a year filled with joy, success, and new
                                adventures!</p>
                            <motion.div className="mt-4 space-x-2">
                                {['🎊', '🥂', '🎆', '🕛'].map((emoji, index) => (
                                    <motion.span
                                        key={index}
                                        className="inline-block text-2xl"
                                        animate={{y: [0, -20, 0]}}
                                        transition={{duration: 1, delay: index * 0.2, repeat: Infinity}}
                                    >
                                        {emoji}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                    <Button
                        onClick={resetForm}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full"
                    >
                        Wish Someone else? Click me!!
                    </Button>
                </div>
            )}
        </div>
    )
}

