import './globals.css'
import Header from '../components/Header'
import SmoothScroll from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import ClientPageTransition from '../components/ClientPageTransition'
import ContactForm from '../components/ContactForm'
// import PasswordGate from '../components/PasswordGate' // Disabled for now - uncomment to re-enable
import { Analytics } from "@vercel/analytics/next"
import { UnifrakturMaguntia } from 'next/font/google'

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
    <html lang="en" className={unifrakturMaguntia.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
                  letterSpacing: '-0.05em',
                  lineHeight: 1.1
                }}>
                  Let&apos;s collaborate, Drop us a line  →
                </div>
              </div>
              <section style={{
                padding: '50px 10% 140px',
                background: '#070707',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{
                  maxWidth: '960px',
                  width: '100%',
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px'
                }}>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '3rem',
                    fontWeight: 300,
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1.1
                  }}>
                    Quick hello, quicker reply.
                  </div>
                  <ContactForm />
                </div>
              </section>
              <Footer />
            </div>
          </div>
        {/* </PasswordGate> - Disabled for now - uncomment to re-enable */}
      </body>
    </html>
  )
}
