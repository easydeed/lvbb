import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '6 Workout Clinic | La Verne Athletic Club',
  description:
    'A FREE 6-session baseball training clinic led by two of the best college coaches in the game. For middle school & high school players. Aug 10–27. Spots are limited — sign up today!',
  generator: 'v0.app',
  manifest: '/manifest.json',
  openGraph: {
    title: '6 Workout Clinic | La Verne Athletic Club',
    description:
      'FREE 6-session baseball training clinic. Train. Compete. Get Better. Spots are limited — sign up today!',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1c3d29',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
