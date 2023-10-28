
/*
jonopoco
/app/[langs]/[type]/(post)/(libs)/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDate } from "@/app/(basis)/util/func"
import { Span, Line, StandardFlex } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

export default async function PostHead({lang, post}: any) {  
  
  return (
    <summary className={`block`}>    

      <StandardFlex>

        <div className={`font-sans w-full`}>

          <h2 className={`
            text-4xl md:text-6xl mb-5 uppercase
          `}>{post.emoji} {post.title}</h2>

          <Line className={`
            text-lg md:text-xl my-5
          `}>
            {post.url && 
              <Span>                
                <Link 
                  className={`button`} 
                  href={post.url} 
                  target={post.url_newtab ? '_blank' : ''}
                >
                  {lang.visit_link}
                </Link>                
              </Span>
            }
            <Span>{post.summary}</Span>
          </Line>

        </div>

        <div className={`
          font-sans w-full text-lg md:text-xl text-gray-500 dark:text-gray-300 mt-2 mb-2 text-right       
        `}>
              
          {post.updated !== undefined && 
            <Line>                        
              <Span className={`text-md mb-0 pb-0`}>              
                {`${lang.last_updated} ${getFormattedDate(post.updated)}`}              
              </Span>          
            </Line>
          }    

          <Line>{lang.published} {post.created && getFormattedDate(post.created)}</Line>
        
          {post.backdated !== undefined && 
            <Line>            
              <Span className={`text-md mt-0 pt-0`}>
                {`${lang.originally_created} ${getFormattedDate(post.backdated)}`} 
              </Span>
            </Line>
          }
                
        </div>
      
      </StandardFlex>

    </summary>
  )
  
}