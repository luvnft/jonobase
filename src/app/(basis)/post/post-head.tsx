
/*
jonobase
/app/(basis)/post/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDateTime } from "@/app/(basis)/util/func"
import { Span, Paragraph, StandardFlex } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

export default function PostHead({lang, post}: any) {  

  const PostHeadMeta = () => {

    return (
    
      <div className={` grow`}>

        <h2 className={`
          text-2xl md:text-4xl lg:text-5xl my-5 uppercase
        `}>{post.emoji} {post.title}</h2>

        <Paragraph className={`text-lg md:text-2xl`}>{post.summary}</Paragraph>

        <Paragraph className={`
          text-sm md:text-lg 
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
        </Paragraph>
            
      </div>

    ) 

  }

  const PostHeadDate = () => {    
    
    return (
      <div className={`
        text-right 
        text-md md:text-lg         
        grow ml-2 my-2
      `}>
            
        {(post.updated !== undefined && post.backdated != '') && 
          <Paragraph className={'whitespace-nowrap'}>
            <Span>
              {`${lang.last_updated} `} 
            </Span>
            <br />
            <Span className={`font-semibold`}>
              {getFormattedDateTime(post.updated)}
            </Span>            
          </Paragraph>
        }    

        <Paragraph className={'whitespace-nowrap'}>
          <Span>{lang.published} </Span>
          <br />
          <Span className={`font-semibold`}>
            {getFormattedDateTime(post.created)}
          </Span>
        </Paragraph>
      
        {(post.backdated !== undefined && post.backdated !== '') && 
          <Paragraph className={'whitespace-nowrap'}>
            <Span>
              {`${lang.originally_created} `}
            </Span>
            <br />
            <Span className={`font-semibold`}>
              {getFormattedDateTime(post.backdated)}
            </Span>            
          </Paragraph>
        }
              
      </div>
    )
  }
  
  return (
    <div className={`block`}>    

      <StandardFlex>

        <PostHeadMeta />

        <PostHeadDate />
      
      </StandardFlex>

    </div>
  )
  
}