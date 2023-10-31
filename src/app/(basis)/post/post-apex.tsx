
/*
jonopoco
/app/(basis)/post/post-apex.tsx
apex (breadcrumbs) for single "post" pages
*/

import Link from "next/link"
import { Span } from "../util/tidy-html"

export default function PostApex({siteName, params, post}: any) {
  
  const { kind, title } = post

  return (
    <aside className={` text-lg md:text-2xl uppercase`}>      

      <Link href={`/`}>{siteName}</Link>
      <Span ariaHidden="true"> / </Span>
      <Link href={`/kinds/${kind}/`}>{decodeURIComponent(kind)}</Link>      
      <Span ariaHidden="true"> / </Span>
      <Span 
        ariaHidden="true" 
        className={`text-sm uppercase`}
      >{title}</Span>
      
    </aside>
  )
  
}