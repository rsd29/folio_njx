// lib/lenis.ts
'use client'

import Lenis from '@studio-freight/lenis'

export const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    gestureOrientation: 'vertical', // optional, safe
    wheelMultiplier: 1, // optional tweak for scroll feel
    touchMultiplier: 1, // for mobile
    infinite: false, // default
})