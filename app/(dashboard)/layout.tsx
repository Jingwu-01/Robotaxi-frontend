import "../css/style.css"

import { Inter } from 'next/font/google'
import Theme from '../theme-provider'
import AppProvider from '../app-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en" className={`${inter.variable}`} suppressHydrationWarning={true}>
      <div className="font-inter antialiased bg-gray-900 text-gray-400">
        <Theme>
          <AppProvider>
            {children}
          </AppProvider>
        </Theme>
      </div>
    </div>
  )
}