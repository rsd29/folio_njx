import './globals.css'
import { DM_Sans } from 'next/font/google'
import Header from '../components/Header'
import LenisWrapper from '../components/SmoothScroll'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Russell Saw — UX Portfolio',
  description: 'UX Designer & Developer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Header />
        <LenisWrapper />
        {children}
           
      </body>
    </html>
  )
}
