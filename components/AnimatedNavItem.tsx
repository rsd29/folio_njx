'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const chars = 'ABDEFGHKLMNOPRSTUWYZ0123456789!@$%*#'

const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)]

export default function AnimatedNavItem({
  href,
  label,
  className = '',
}: {
  href: string
  label: string
  className?: string
}) {
  const [displayed, setDisplayed] = useState<string[]>([])

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
const revealChar = (i: number) => {
  let iterations = 0
  const maxIterations = 4 + Math.floor(Math.random() * 10) 

  const interval = setInterval(() => {
    setDisplayed((prev) => {
      const updated = [...prev]
      updated[i] = iterations >= maxIterations ? label[i] : getRandomChar()
      return updated
    })
    iterations++

    if (iterations > maxIterations) clearInterval(interval)
  }, 20) 
}

    setDisplayed(Array(label.length).fill(''))

for (let i = 0; i < label.length; i++) {
  timeouts.push(setTimeout(() => revealChar(i), i * 200)) 
}

    return () => timeouts.forEach(clearTimeout)
  }, [label])

  return (
    <Link href={href} className={className}>
      {displayed.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          style={{
            display: 'inline-block',

            color: char !== label[i] ? '#4cff75' : '#ffffff',
            transition: 'color 0.2s ease-in-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Link>
  )
}
