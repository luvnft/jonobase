
/* 
jonopoco 
/app/basis/a11y/skip.tsx 
accessibility component for "skip to main content" link
un-hides before the header by pressing shift+tab  
*/

'use client'

import Link from "next/link"
import styles from './styles.module.css'

export default function Skip({ text } : any) {

  const handleSkip = () => {
    document.getElementsByTagName("main")[0].focus()
  }

  return (
    <Link 
      href="#main" 
      onClick={handleSkip}
      className={styles.skiplink}
    >
      {text}
    </Link>
  )
}