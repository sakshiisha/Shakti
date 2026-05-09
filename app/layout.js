import { DM_Sans, Yatra_One } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans'
})

const yatraOne = Yatra_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yatra'
})

export const metadata = {
  title: 'SHAKTI — शक्ति',
  description: 'Your safety is our dharma',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={`${dmSans.variable} ${yatraOne.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}