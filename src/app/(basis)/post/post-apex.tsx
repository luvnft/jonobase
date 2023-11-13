
/*
jonobase
/app/(basis)/post/post-apex.tsx
apex (breadcrumbs) for single "post" pages
*/

import Link from "next/link"
import { Span } from "../util/tidy-html"

interface PostApexProps {
  siteName: string,
  post: any,
  params?: any
}

export default function PostApex({siteName, post}: PostApexProps) {
  
  const { expand : { kind }, title } = post

  return (
    <aside 
      className={`post-apex 
        text-lg sm:text-2xl uppercase my-5 lg:my-2
      `}
    >

      <Link href={`/`}>{siteName}</Link>
      
      <Span ariaHidden="true"> / </Span>
      
      <Link href={`/kinds/${kind.slug}/`}>{decodeURIComponent(kind.slug)}</Link>
      
      <Span ariaHidden="true"> / </Span>
      
      <Span 
        ariaHidden="true" 
        className={`text-sm uppercase`}
      >{title}</Span>
      
    </aside>
  )
  
}