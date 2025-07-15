'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|\\/._-+=~*'
const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)]

interface TextSegment {
  text: string
  isStrong?: boolean
}

interface AnimatedRichTextProps {
  segments: TextSegment[]
  fontSize?: string
  fontWeight?: number
  lineHeight?: number
  maxWidth?: string
  className?: string
  useFlickerEffect?: boolean
}

export default function AnimatedRichText({
  segments,
  fontSize = '2rem',
  fontWeight = 300,
  lineHeight = 1.2,
  maxWidth = '100ch',
  className = '',
  useFlickerEffect = true,
}: AnimatedRichTextProps) {
  const fullText = useMemo(() => segments.map((s) => s.text).join(''), [segments])
  const [displayed, setDisplayed] = useState<string[]>([])
  const displayedRef = useRef<string[]>([])
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    const length = fullText.length
    const initialArray = Array(length).fill('')
    setDisplayed(initialArray)
    displayedRef.current = [...initialArray]

    const timeouts: NodeJS.Timeout[] = []

    const revealChar = (i: number) => {
      if (!useFlickerEffect) {
        setTimeout(() => {
          displayedRef.current[i] = fullText[i]
          setDisplayed([...displayedRef.current])
        }, i * 10)
        return
      }

      let iterations = 0
      const maxIterations = 3 + Math.floor(Math.random() * 10)

      const animate = () => {
        const finalChar = fullText[i]
        displayedRef.current[i] = iterations >= maxIterations ? finalChar : getRandomChar()
        setDisplayed([...displayedRef.current])
        iterations++

        if (iterations <= maxIterations) {
          animationFrame.current = requestAnimationFrame(animate)
        }
      }

      timeouts.push(setTimeout(() => requestAnimationFrame(animate), i * 50))
    }

    for (let i = 0; i < fullText.length; i++) {
      revealChar(i)
    }

    return () => {
      timeouts.forEach(clearTimeout)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [fullText, useFlickerEffect])

  let globalCharIndex = 0

  return (
    <h2
      className={className}
      style={{
        fontSize,
        fontWeight,
        lineHeight,
        maxWidth,
        fontFamily: 'Funnel Sans, sans-serif',
        flexWrap: 'wrap',
      }}
    >
      {segments.map(({ text, isStrong }, segmentIdx) => {
        const chars = text.split('').map((_, i) => {
          const globalIdx = globalCharIndex + i
          const char = displayed[globalIdx] ?? ''

          return (
            <motion.span
              key={`${segmentIdx}-${i}`}
              initial={{
                opacity: 0,
                y: -20,
                x: 10,
                scale: 0.95,
    textShadow: isStrong
  ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.71)'
  : 'none'
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                textShadow: isStrong ? '0 0 4px rgba(255, 255, 255, 0.6)' : 'none',
              }}
              transition={{
                delay: globalIdx * 0.04,
                type: 'spring',
                stiffness: 120,
                damping: 16,
                mass: 1,
              }}
              style={{
                display: 'inline-block',
                fontWeight: isStrong ? 400 : fontWeight,
                color: useFlickerEffect
                  ? char !== text[i]
                    ? '#4cff75'
                    : '#ffffff'
                  : '#ffffff',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          )
        })

        globalCharIndex += text.length
        return (
          <span key={`segment-${segmentIdx}`} style={{ display: 'inline-block' }}>
            {chars}
          </span>
        )
      })}
    </h2>
  )
}
