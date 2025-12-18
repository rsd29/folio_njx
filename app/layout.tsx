import './globals.css'
import Header from '../components/Header'
import SmoothScroll from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import { NavigationProvider } from '../components/NavigationProvider'
import FooterCta from '../components/FooterCta'
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
                <FooterCta />
                <Footer />
              </div>
            </div>
            </NavigationProvider>
        {/* </PasswordGate> - Disabled for now - uncomment to re-enable */}
      </body>
    </html>
  )
}
