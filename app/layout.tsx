"use client"

import "@space-metaverse-ag/space-ui/index.css"
import './globals.css'
import { ThemeProvider } from '@mui/material';
import { ThemeProvider as SpaceThemeProvider } from '@space-metaverse-ag/space-ui'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../redux/store'
import { theme } from './theme';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const showNav = pathname !== '/login' && pathname !== '/signup' && pathname !== '/forgot-password' && pathname !== '/reset-password'
  const showFooter = pathname !== '/login' && pathname !== '/signup' && pathname !== '/forgot-password' && pathname !== '/reset-password'

  return (
    <html lang="en">
      <ReduxProvider store={store}>
        <SpaceThemeProvider>
          <ThemeProvider theme={theme}>
            <body>
              {showNav && <TopNav />}
              {children}
              {showFooter && <Footer />}
            </body>
          </ThemeProvider>
        </SpaceThemeProvider>
      </ReduxProvider>
    </html>
  )
}
