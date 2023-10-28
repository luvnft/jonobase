
/*
jonopoco
/app/[langs]/[type]/(list)/(libs)/list-apex.tsx
apex (breadcrumbs) for lists
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export default async function ListApex({lang, type, params, term, current}: any) {
  
  return (
    <aside className={`font-sans text-lg md:text-2xl uppercase`}>      

      {/* post type */}      
      { (term === '' || term === 'all' || term === undefined) && 
        <>          
          <Span>{decodeURIComponent(type)}</Span>
        </>        
      }

      {/* post type link (if not already there) */}
      { (term !== 'all' && term !== '' && term !== undefined) && 
        <>          
          <Link href={`/${params.langs}/${type}`}>{decodeURIComponent(type)}</Link>
        </>
      }
      
      {/* crumb for listing term (tag) results */}
      { (term !== '' && term !== undefined) && 
        <>
          <Span ariaHidden="true"> / </Span>
          <Span>{decodeURIComponent(term)}</Span>
        </>
      }

      {/* crumb for listing find (search) results  */}
      { (params.find !== '' && params.find !== undefined) && 
        <>
          <Span ariaHidden="true"> / </Span>
          <Span>{decodeURIComponent(params.find)}</Span>
        </>
      }

      {/* crumb for list page number */}
      { current > 1 && 
        <>
          <Span ariaHidden="true"> / </Span>
          <Span>{lang.page}</Span>
          <Span ariaHidden="true"> / </Span>
          <Span>{current}</Span>
        </>
      }    
    </aside>
  )
  
}