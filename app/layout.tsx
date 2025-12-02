import './globals.css'
import Header from '../components/Header'
import SmoothScroll from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import { NavigationProvider } from '../components/NavigationProvider'
import ContactForm from '../components/ContactForm'
// import PasswordGate from '../components/PasswordGate' // Disabled for now - uncomment to re-enable
import { Analytics } from "@vercel/analytics/next"
import { UnifrakturMaguntia, Inter } from 'next/font/google'

const unifrakturMaguntia = UnifrakturMaguntia({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-unifraktur',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Stack Sans Notch is not available in next/font/google, so we'll keep it as external but optimize loading

export const metadata = {
  title: 'Russell Saw — UX Portfolio',
  description: 'UX Designer & Developer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unifrakturMaguntia.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Stack Sans Notch loaded asynchronously to avoid blocking render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap';
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body>
        <Analytics />
        {/* <PasswordGate> - Disabled for now - uncomment to re-enable */}
          <NavigationProvider>
            <NegativeCursor />
            <Header />
            <SmoothScroll />
            <div id="smooth-wrapper">
              <div id="smooth-content">
                {children}
              <div style={{
                width: '100%',
                height: '50vh',
                minHeight: '400px',
                maxHeight: '600px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                contain: 'layout style paint'
              }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
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
                  lineHeight: 1.1,
                  minHeight: '1.1em'
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
            </NavigationProvider>
        {/* </PasswordGate> - Disabled for now - uncomment to re-enable */}
      </body>
    </html>
  )
}
