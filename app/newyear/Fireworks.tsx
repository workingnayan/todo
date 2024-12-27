'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
    id: number
    x: number
    y: number
    color: string
    angle: number
    speed: number
}

interface Firework {
    id: number
    x: number
    y: number
    particles: Particle[]
}

const PARTICLE_COUNT = 30
const EXPLOSION_RADIUS = 100

export function Fireworks() {
    const [fireworks, setFireworks] = useState<Firework[]>([])

    const createParticles = (x: number, y: number): Particle[] => {
        return Array.from({ length: PARTICLE_COUNT }).map((_, index) => ({
            id: index,
            x,
            y,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            angle: (Math.PI * 2 * index) / PARTICLE_COUNT,
            speed: 2 + Math.random() * 2,
        }))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const newFirework: Firework = {
                id: Date.now(),
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 0.5, // Explode in top half of screen
                particles: createParticles(0, 0), // Will be positioned relative to firework
            }
            setFireworks(prev => [...prev, newFirework])
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (fireworks.length > 5) {
            const timer = setTimeout(() => {
                setFireworks(prev => prev.slice(1))
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [fireworks])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {fireworks.map(firework => (
                <div key={firework.id} className="absolute" style={{ left: firework.x, top: firework.y }}>
                    {firework.particles.map(particle => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: particle.color,
                                boxShadow: `0 0 6px ${particle.color}`,
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [1, 0],
                                x: Math.cos(particle.angle) * EXPLOSION_RADIUS * particle.speed,
                                y: Math.sin(particle.angle) * EXPLOSION_RADIUS * particle.speed,
                            }}
                            transition={{
                                duration: 1.5,
                                ease: [0.36, 0.07, 0.19, 0.97],
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

