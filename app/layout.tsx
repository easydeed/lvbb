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
    'FREE 6-session 12U baseball development clinic. Aug 10, 12, 17, 19, 24 & 26 · 5:30 PM – 7:30 PM. Locations: Mt. SAC (1100 N. Grand Ave., Walnut, CA 91789) and Bonita High School (3102 D Street, La Verne, CA 91750). Spots are limited — sign up today!',
  generator: 'v0.app',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Free 6-Session 12U Baseball Development Clinic | La Verne Athletic Club',
    description:
      'FREE 6-session clinic for 12U Players. Aug 10–26 · 5:30 PM – 7:30 PM at Mt. SAC and Bonita High School. Get your reps in. Get better. Get ready.',
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
