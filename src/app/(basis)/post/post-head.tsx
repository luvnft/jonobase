
/*
jonopoco
/app/(basis)/post/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDate } from "@/app/(basis)/util/func"
import { Span, Line, StandardFlex } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

export default async function PostHead({lang, post}: any) {  
  
  return (
    <summary className={`block`}>    

      <StandardFlex>

        <div className={`font-sans grow`}>

          <h2 className={`
            text-2xl md:text-6xl mb-5 uppercase
          `}>{post.emoji} {post.title}</h2>

          <Line>{post.summary}</Line>

          <Line className={`
            text-sm md:text-xl 
          `}>
            {post.url &&               
              <Link 
                className={`button`} 
                href={post.url} 
                target={post.url_newtab ? '_blank' : ''}
              >
                {lang.visit_link}
              </Link>                              
            }
          </Line>
              
        </div>

        <div className={`
          font-sans text-right 
          text-sm md:text-xl 
          text-gray-500 dark:text-gray-300
          grow mt-2 mb-2 
        `}>
              
          {post.updated !== undefined && 
            <Line>
              <Span className={'whitespace-nowrap'}>
                {`${lang.last_updated} ${getFormattedDate(post.updated)}`}
              </Span>
            </Line>
          }    

          <Line>{lang.published} {post.created && getFormattedDate(post.created)}</Line>
        
          {post.backdated !== undefined && 
            <Line>
              <Span className={'whitespace-nowrap'}>
                {`${lang.originally_created} ${getFormattedDate(post.backdated)}`}
              </Span>
            </Line>
          }
                
        </div>
      
      </StandardFlex>

    </summary>
  )
  
}