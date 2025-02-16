
/*
jonobase
/app/layout.tsx
the general page skeleton
*/

import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/app/(basis)/util/lite-dark'
import { getBase } from '@/app/(basis)/util/data'
import Head from '@/app/(basis)/head/head'
import Tail from '@/app/(basis)/tail/tail'
import { getImageURL, getThemeLink, getTheme } from './(basis)/util/func'

export const dynamic = 'auto'
export const revalidate = 10
export const fetchCache = 'auto'

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const { app } = await getBase()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        { app.icon && <link rel="icon" href={`${getImageURL(app.collectionId, app.id, app.icon)}?v=${Date.now()}`} />}
      </head>      
      <body className={`flex flex-col overflow-auto min-h-screen prose-p:mb-4`}>
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
          <Head />
          <main tabIndex={-1} className={`${getThemeLink(app.theme)} ${getTheme()}`}>
            {children}
          </main>
          <Tail />
        </ThemeProvider>
      </body>
    </html>
  )
}