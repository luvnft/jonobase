
/* 
jonobase 
/app/(basis)/a11y/skip.tsx 
accessibility component for "skip to main content" link
un-hides before the header by pressing shift+tab  
*/

'use client'

import Link from "next/link"

export default function Skip({ text } : any) {

  const handleSkip = () => {
    document.getElementsByTagName("main")[0].focus()
  }

  return (
    <Link 
      href="#main" 
      onClick={handleSkip}
      className={`
        absolute top-0 right-full z-[1000] 
        focus:right-auto focus:bg-zinc-600 focus:text-white focus:border-2 
        focus:border-white focus:p-4
      `} 
    >
      {text}
    </Link>
  )
}