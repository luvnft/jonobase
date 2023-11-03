"use client"

/*
jonobase
/app/(basis)/util/lite-dark.tsx : 
allows switching between light mode and dark mode 

on layout.tsx: 

  import { ThemeProvider } from '@/app/(basis)/util/lite-dark`

and then also on layout.tsx:

  <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
  {children}
  </ThemeProvider>

*/

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}