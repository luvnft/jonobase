
/* 
jonobase 
/app/(basis)/a11y/skip.tsx
accessibility component for "skip to main content" link
un-hides before the header by pressing shift+tab
*/

'use client'

import { FC } from "react"
import Link from "next/link"
import { TextProps } from "../util/types"

const Skip: FC<TextProps> = ({ text }: TextProps) => {

  const handleSkip = () => {
    document.getElementsByTagName("main")[0].focus()
  }

  return (
    <Link 
      href="#main"
      onClick={handleSkip}
      className={`skip-link
        absolute top-0 right-full z-[1000]
        focus:right-auto focus:bg-zinc-600 focus:text-white focus:border-2
        focus:border-white focus:p-4
      `}
    >
      {text}
    </Link>
  )
}

export default Skip