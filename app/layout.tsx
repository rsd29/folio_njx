import './globals.css'
import { DM_Sans } from 'next/font/google'
import Header from '../components/Header'
import LenisWrapper from '../components/SmoothScroll'
import Footer from '../components/Footer'
import NegativeCursor from '../components/NegativeCursor'
import { Analytics } from "@vercel/analytics/next"
import { Funnel_Display, Funnel_Sans } from 'next/font/google'

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
export const metadata = {
  title: 'Russell Saw — UX Portfolio',
  description: 'UX Designer & Developer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${funnelDisplay.variable} ${funnelSans.variable}`}>

      <body className={dmSans.className} > 
        <Analytics/ >
        <NegativeCursor />
        <Header />
        <LenisWrapper />
        {children}
          <Footer/>
      </body>
    </html>
  )
}
