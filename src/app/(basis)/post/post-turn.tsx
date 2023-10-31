
/*
jonopoco
/app/(basis)/post/post-turn.tsx
turn (page-flipper) for single "post" pages
*/

import Link from "next/link";
import { Span, Line } from "@/app/(basis)/util/tidy-html";

import { getAdjacentPost, getBase } from "@/app/(basis)/util/data";

export default async function PostTurn({lang, post, params}: any) {

  const { app } = await getBase()
  
  const newerPostInSite = await getAdjacentPost(post, "newer", "site")  
  const olderPostInSite = await getAdjacentPost(post, "older", "site")
  const newerPostInType = await getAdjacentPost(post, "newer", "kind")
  const olderPostInType = await getAdjacentPost(post, "older", "kind")

  const TurnCard = ({older, newer, criteria}: any) => {
    
    return (
      <div className={`
        border border-2 dark:border-gray-500 my-5 
         text-lg md:text-xl text-center
        flex flex-col md:flex-row items-center 
        ${older ? 'justify-start' : 'justify-end'}
      `}>
        
        { older && 
          <Link href={`/posts/${older.slug}`}
            className={`${older ? 'block' : ''} md:block md:w-1/3 p-2 md:p-5`}
          > 
            <Span className={`no-underline`} ariaLabel={lang.older}>⏪</Span>               
            <Span className={`ml-2`}>{ older.title }</Span>          
          </Link>
        }
        
        <div className={`
          md:w-1/3 w-full p-5 
          border-y-2 md:border-x-2 
          dark:border-gray-500 md:border-y-0 
          `}
        > 
          <Span className={`sr-only`}>{lang.navigate_site} :</Span>
          <Span>{criteria}</Span>
        </div>

        { newer &&           
          <Link href={`/posts/${newer.slug}`}
            className={`${newer ? 'block' : 'hidden'} md:w-1/3 p-2 md:p-5`}
          >              
            <Span className={`mr-2`}>{ newer.title }</Span>
            <Span ariaLabel={lang.newer}>⏩</Span>               
          </Link>
        }
        
      </div> 
    )
  }
  
  return (     
    <>
      { (olderPostInType || newerPostInType) &&
        <TurnCard 
          older={olderPostInType} 
          newer={newerPostInType} 
          criteria={post.kind} 
        />
      }
      { (olderPostInSite || newerPostInSite) &&
        <TurnCard 
          older={olderPostInSite} 
          newer={newerPostInSite} 
          criteria={app.title} 
        />
      }     
    </>
  )
  
}