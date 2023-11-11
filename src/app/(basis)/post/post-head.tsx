
/*
jonobase
/app/(basis)/post/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDateTime } from "@/app/(basis)/util/func"
import { Span, Paragraph, SuperFlex } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

export default function PostHead({lang, post}: any) { 

  const PostHeadMeta = () => {

    return (
    
      <div className={` grow`}>

        <h2 className={`
          text-4xl lg:text-5xl my-5 uppercase
        `}>{post.emoji} {post.title}</h2>

        <Paragraph className={`text-lg sm:text-2xl`}>{post.summary}</Paragraph>

        <Paragraph className={`
          text-sm sm:text-lg 
        `}>
          {post.url &&               
            <Link 
              className={`button !border-white !text-white`} 
              href={post.url} 
              target={post.url_newtab ? '_blank' : '_top'}
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
        text-center sm:text-right 
        text-md sm:text-lg         
        grow ml-0 sm:ml-2 my-2        
      `}>
            
        {(post.updated !== undefined && post.updated != '') && 
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
          <Paragraph className={'whitespace-nowrap hidden sm:block'}>
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

      <SuperFlex         
        className={`
          ${post.thumbnail && 
            `bg-gray-900/60 rounded-md my-5 p-5 text-white`
          } 
          flex-col sm:flex-row text-center sm:text-left
        `}
      >

        <PostHeadMeta />

        <PostHeadDate />
      
      </SuperFlex>

    </div>
  )
  
}