
/*
jonopoco
/app/(basis)/meat/meat-turn.tsx
turn (page-flipper) for single "meat" pages
*/

import Link from "next/link";
import { Span } from "@/app/(basis)/util/tidy-html";

import { getAdjacentPost, getBase } from "@/app/(basis)/util/data";

export default async function MeatTurn({lang, post, params}: any) {

  const { app } = await getBase()
  
  const newerPostInSite = await getAdjacentPost(post, "newer", "site")  
  const olderPostInSite = await getAdjacentPost(post, "older", "site")
  const newerPostInType = await getAdjacentPost(post, "newer", "type")
  const olderPostInType = await getAdjacentPost(post, "older", "type")
  const newerPostInBook = await getAdjacentPost(post, "newer", "book")
  const olderPostInBook = await getAdjacentPost(post, "older", "book")

  const TurnCard = ({older, newer, criteria}: any) => {
    
    return (
      <div className={`
        border border-2 my-5 first:mt-0 last:mb-0 font-sans text-xl
        flex flex-col md:flex-row items-center text-center
      `}>
        <div className={`${older ? 'block' : 'hidden'} md:block md:w-1/3 p-5`}> 
          { older && 
            <Link href={`/${params.language}/${older.post_type}/${older.slug}`}>
              <Span ariaHidden={true} ariaLabel={lang.older}>⏪</Span>               
              <Span className={`ml-2`}>{ older.title }</Span>
            </Link>
          }
        </div>
        <div className={`md:w-1/3 w-full border-y-2 md:border-x-2 md:border-y-0 p-5 font-bold`}> 
          {criteria} 
        </div>
        <div className={`${newer ? 'block' : 'hidden'} md:w-1/3 p-5`}> 
          { newer && 
            <Link href={`/${params.language}/${newer.post_type}/${newer.slug}`}>              
              <Span className={`mr-2`}>{ newer.title }</Span>
              <Span ariaHidden={true} ariaLabel={lang.newer}>⏩</Span>               
            </Link>
          }
        </div>
      </div> 
    )
  }
  
  return (     
    <>
      { (olderPostInBook || newerPostInBook) &&
        <TurnCard 
          older={olderPostInBook} 
          newer={newerPostInBook} 
          criteria={post.book} 
        />
      }
      { (olderPostInType || newerPostInType) &&
        <TurnCard 
          older={olderPostInType} 
          newer={newerPostInType} 
          criteria={post.post_type} 
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