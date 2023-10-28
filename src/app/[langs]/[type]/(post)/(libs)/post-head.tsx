
/*
jonopoco
/app/[langs]/[type]/(post)/(libs)/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDate, getFormattedDateTime } from "@/app/(basis)/util/func"
import { Span, StandardFlex } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

export default async function PostHead({lang, post}: any) {  
  
  return (
    <summary className={`block`}>
      
      <h2 className={`
        text-4xl md:text-6xl mt-5 mb-0 uppercase
      `}>{post.emoji} {post.title}</h2>
            
      <p className={`
        font-sans text-lg md:text-xl text-gray-500 dark:text-gray-300 mt-2 mb-2        
      `}>
      
        {lang.published} {post.created && getFormattedDateTime(post.created)}     

        {post.updated !== undefined && 
          <>
            <Span className={`hidden md:inline text-sm`}> &larr; </Span>
            <br className={`md:hidden`} />
            <Span className={`text-sm`}>
              <em>
                {`${lang.last_updated} ${getFormattedDateTime(post.updated)}`}
              </em>
            </Span>          
          </>
        }    
      
        {post.backdated !== undefined && 
          <>
            <Span className={`text-sm`}> &larr; </Span>            
            <Span className={`text-sm`}>
              {`${lang.originally_created} ${getFormattedDate(post.backdated)}`} 
            </Span>
          </>
        }
              
      </p>

      <StandardFlex>

        <p className={`
          font-sans text-lg md:text-xl my-5
        `}>{post.summary}</p>

        <p className={`
          text-lg md:text-xl my-5 
        `}>
          <Link className={`button`} href={post.url} target={post.url_newtab ? '_blank' : ''}>
            {lang.visit_link}
          </Link>
        </p>
      
      </StandardFlex>

    </summary>
  )
  
}