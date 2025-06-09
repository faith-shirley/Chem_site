import './globals.css'
import { ReactNode } from 'react'
import Header from '../components/header'

export const metadata = {
  title: 'Chemistry Resources',
  description: 'Sell chemistry resources online',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
