import './globals.css'
import { DM_Sans } from 'next/font/google'
import Header from '../components/Header'
import SmoothScroll from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import ClientPageTransition from '../components/ClientPageTransition'
import PasswordGate from '../components/PasswordGate'
import { Analytics } from "@vercel/analytics/next"
import { Funnel_Display, Funnel_Sans, UnifrakturMaguntia } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})
const funnelDisplay = Funnel_Display({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const funnelSans = Funnel_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const unifrakturMaguntia = UnifrakturMaguntia({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-unifraktur',
  display: 'swap',
})

export const metadata = {
  title: 'Russell Saw — UX Portfolio',
  description: 'UX Designer & Developer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${funnelDisplay.variable} ${funnelSans.variable} ${unifrakturMaguntia.variable}`}>
      <body className={dmSans.className}>
        <Analytics />
        <PasswordGate>
          <NegativeCursor />
          <Header />
          <SmoothScroll />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <ClientPageTransition />
              <div style={{
                width: '100%',
                height: '50vh',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    backgroundImage: 'url("https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-poster-00001.jpg")'
                  }}
                >
                  <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm" type="video/webm" />
                  <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.mp4" type="video/mp4" />
                </video>
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '10%',
                  right: '10%',
                  textAlign: 'left',
                  zIndex: 2,
                  color: '#ffffff',
                  fontSize: '5rem',
                  fontWeight: 300,
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '-0.08em',
                  lineHeight: 1.1
                }}>
                  Let&apos;s collaborate, Drop us a line  →
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </PasswordGate>
      </body>
    </html>
  )
}
