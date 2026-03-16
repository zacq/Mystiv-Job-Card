import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mystiv Workshop — Job Card Intake',
  description: 'Walk-in vehicle service intake form for Mystiv Workshop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
