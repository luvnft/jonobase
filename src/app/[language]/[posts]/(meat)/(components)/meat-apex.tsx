
/*
jonopoco
/app/(basis)/meat/meat-apex.tsx
apex (breadcrumbs) for single "meat" pages
*/

import Link from "next/link"
import { Span } from "../../../../(basis)/util/tidy-html"

export default async function MeatApex({params, post}: any) {
  
  const { post_type, title } = post

  return (
    <aside className={`font-sans text-lg md:text-2xl uppercase`}>      
          
      <Link href={`/${params.language}/${post_type}/`}>{decodeURIComponent(post_type)}</Link>      
      <Span ariaHidden="true"> / </Span>
      <Span 
        ariaHidden="true" 
        className={`text-sm uppercase`}
      >{title}</Span>
      
    </aside>
  )
  
}