
/*
jonopoco
/app/layout.tsx
the general page skeleton
*/

import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/app/(basis)/util/lite-dark'
import { getBase } from '@/app/(basis)/util/data'
import Skip from '@/app/(basis)/a11y/skip'
import Head from '@/app/(basis)/head/head'
import Tail from '@/app/(basis)/tail/tail'
import { Suspense } from 'react'
import { Load } from './(basis)/util/load-spin'
import { getImageURL } from './(basis)/util/func'

export const dynamic = 'auto'
export const revalidate = 60
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

  const { app, lang } = await getBase()  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        { app.icon && <link rel="icon" href={`${getImageURL(app.collectionId, app.id, app.icon)}?v=${Date.now()}`} />}        
      </head>      
      <body className={`flex flex-col overflow-auto min-h-screen`}>        
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
          <Skip text={lang.skip_to_main_content} />
          <Head />          
            <main tabIndex={0}>
              <Suspense fallback={<Load />}>
                {children}
              </Suspense>
            </main>
          <Tail />          
        </ThemeProvider>
      </body>
    </html>
  )
}