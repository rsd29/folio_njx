import './globals.css'
import Header from '../components/Header'
import SmoothScroll from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import ClientPageTransition from '../components/ClientPageTransition'
// import PasswordGate from '../components/PasswordGate' // Disabled for now - uncomment to re-enable
import { Analytics } from "@vercel/analytics/next"
import { Figtree, UnifrakturMaguntia } from 'next/font/google'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300','400','500','600','700','800','900'],
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
    <html lang="en" className={`${figtree.variable} ${unifrakturMaguntia.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body className={figtree.className}>
        <Analytics />
        {/* <PasswordGate> - Disabled for now - uncomment to re-enable */}
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
        {/* </PasswordGate> - Disabled for now - uncomment to re-enable */}
      </body>
    </html>
  )
}
