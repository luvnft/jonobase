
/*
jonopoco
/app/(basis)/loop/loop-apex.tsx
apex (breadcrumbs) for loop-type pages (find, kind, list)
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export const LoopApex = ({site, lang, params, current}: any) => {

  const Home = () => {
    return (
      <Span>{site} </Span>      
    )
  }

  const HomeLink = () => {
    return (
      <Link href={`/`}>{site}</Link> 
    )
  }

  const Fold = ({label, linkLabel, folder}: any) => {
    return (
      <>
        <Span ariaHidden={true}> / </Span>
        { linkLabel 
          ? <Link href={`/${label}/`}>{label}</Link> 
          : <Span> {label} </Span>
        } 
        <Span ariaHidden={true}> / </Span>
        { folder && <Span> {decodeURIComponent(folder)} </Span>}
      </>
    )
  }

  const Page = () => {
    return (              
      <Span> ({lang.page} {current})</Span>      
    )
  }

  const Take = () => {
    return (
      <Span> {params.takes} </Span> 
    )
  }
  
  return (
    <aside className={` text-lg md:text-2xl uppercase`}> 

      { (!params.finds && !params.kinds && !params.lists && !params.takes) &&
        <Home />                  
      }

      { (params.finds || params.kinds || params.lists) &&
        <HomeLink />
      } 

      { (params.finds) && 
        <Fold label={`finds`} folder={params.finds} />
      }  

      { (params.kinds) && 
        <Fold label={`kinds`} linkLabel={true} folder={params.kinds} />
      }  

      { (params.lists) && 
        <Fold label={`lists`} folder={params.lists} />
      }

      { 
        (params.takes) &&
        <Take />
      }                   
      
      { current > 1 && 
        <Page />        
      }    

    </aside>
  )
  
}