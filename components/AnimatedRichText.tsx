'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|\\/._-+=~*'
const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)]

interface TextSegment {
  text: string
  isStrong?: boolean
  opacity?: number
  color?: string
  fontFamily?: string
  fontSize?: string
  glow?: boolean
}

interface AnimatedRichTextProps {
  segments: TextSegment[]
  fontSize?: string
  fontWeight?: number
  lineHeight?: number
  maxWidth?: string
  className?: string
  useFlickerEffect?: boolean
  letterSpacing?: string
  animationSpeed?: number // Multiplier for animation speed (higher = faster)
}

export default function AnimatedRichText({
  segments,
  fontSize = '2rem',
  fontWeight = 300,
  lineHeight = 1.2,
  maxWidth = '100ch',
  className = '',
  useFlickerEffect = true,
  letterSpacing = '0',
  animationSpeed = 1,
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
        }, (i * 10) / animationSpeed)
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

      timeouts.push(setTimeout(() => requestAnimationFrame(animate), (i * 60) / animationSpeed))
    }

    for (let i = 0; i < fullText.length; i++) {
      revealChar(i)
    }

    return () => {
      timeouts.forEach(clearTimeout)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [fullText, useFlickerEffect, animationSpeed])

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
        letterSpacing,
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
      }}
    >
      {segments.map(({ text, isStrong, opacity, color, fontFamily, fontSize: segmentFontSize, glow }, segmentIdx) => {
        // Split text into words to keep them together
        const words = text.split(' ')
        let segmentCharIndex = globalCharIndex
        
        const wordElements = words.map((word, wordIdx) => {
          const wordStartIdx = segmentCharIndex
          const wordChars = word.split('').map((_, i) => {
            const globalIdx = wordStartIdx + i
            const char = displayed[globalIdx] ?? ''

            return (
              <motion.span
                key={`${segmentIdx}-${wordIdx}-${i}`}
                initial={{
                  opacity: 0,
                  y: -20,
                  x: 10,
                  scale: 0.95,
                  textShadow: glow
                    ? '0 0 3px rgba(255, 255, 255, 0.4), 0 0 6px rgba(255, 255, 255, 0.3)'
                    : isStrong
                    ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.71)'
                    : 'none'
                }}
                animate={{
                  opacity: opacity !== undefined ? opacity : 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  textShadow: glow
                    ? '0 0 3px rgba(255, 255, 255, 0.4), 0 0 6px rgba(255, 255, 255, 0.3)'
                    : isStrong 
                    ? '0 0 4px rgba(255, 255, 255, 0.6)' 
                    : 'none',
                }}
                transition={{
                  delay: (globalIdx * 0.06) / animationSpeed,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  mass: 1,
                }}
                style={{
                  display: 'inline-block',
                  fontWeight: isStrong ? 400 : fontWeight,
                  fontFamily: fontFamily || 'inherit',
                  fontSize: segmentFontSize || fontSize,
                  color: color || (useFlickerEffect
                    ? char !== word[i]
                      ? '#4cff75'
                      : '#ffffff'
                    : '#ffffff'),
                  textShadow: glow 
                    ? '0 0 3px rgba(255, 255, 255, 0.4), 0 0 6px rgba(255, 255, 255, 0.3)'
                    : isStrong
                    ? '0 0 4px rgba(255, 255, 255, 0.6)'
                    : 'none',
                }}
              >
                {char}
              </motion.span>
            )
          })

          segmentCharIndex += word.length
          
          // Add space after word (except last word)
          if (wordIdx < words.length - 1) {
            segmentCharIndex += 1 // Account for the space
          }

          return (
            <span key={`word-${segmentIdx}-${wordIdx}`}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {wordChars}
              </span>
              {wordIdx < words.length - 1 && ' '}
            </span>
          )
        })

        globalCharIndex += text.length
        return (
          <span key={`segment-${segmentIdx}`} style={{ display: 'inline' }}>
            {wordElements}
          </span>
        )
      })}
    </h2>
  )
}
