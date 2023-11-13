
/*
jonobase
/app/(basis)/post/post-head.tsx
head (hero) for single "post" pages
*/

import { getFormattedDateTime } from "@/app/(basis)/util/func"
import { SuperFlex, Paragraph } from "@/app/(basis)/util/tidy-html"
import Link from "next/link"

interface PostHeadProps {
  lang: { [x: string]: string},
  post: any,
}

export default function PostHead({lang, post}: PostHeadProps) {

  const PostHeadMeta = () => {

    return (
    
      <div className={`grow`}>

        <h2 
          className={`post-head-meta
            uppercase text-4xl sm:text-5xl lg:text-6xl
          `}
        >
          {post.thumbnail ? '' : post.emoji} 
          {post.title}
        </h2>

        <Paragraph 
          className={`post-head-summary
            text-sm sm:text-2xl my-5
          `}
        >
          {post.summary}
        </Paragraph>

        <Paragraph 
          className={`post-head-link
            text-sm sm:text-lg 
          `}
        >
          {post.url &&
            <Link 
              className={`button ${post.thumbnail && `!border-white !text-white`}`} 
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

      <SuperFlex
        className={`post-head-date
          grow sm:flex-col sm:items-end gap-5
          text-sm sm:text-lg max-w-full
        `}
      >
            
        {(post.updated !== undefined && post.updated != '') && 
          <SuperFlex
            orientation="col"
            className={`post-head-updated 
              grow sm:items-end sm:text-right
              whitespace-nowrap hidden sm:flex 
            `}
          >
            <div className={`font-light`}>
              {`${lang.last_updated} `} 
            </div>
            <div className={`font-semibold`}>
              {getFormattedDateTime(post.updated)}
            </div>
          </SuperFlex>
        }

        <SuperFlex
          orientation="col"
          className={`post-head-created
            grow sm:items-end sm:text-right
            whitespace-nowrap
          `}
        >
          <div className={`font-light`}>
            {`${lang.published} `} 
          </div>
          <div className={`font-semibold`}>
            {getFormattedDateTime(post.created)}
          </div> 
        </SuperFlex>
      
        {(post.backdated !== undefined && post.backdated !== '') && 
          <SuperFlex
            orientation="col"
            className={`post-head-backdated
              grow sm:items-end sm:text-right
              whitespace-nowrap hidden sm:flex
            `}>
            <div className={`font-light`}>
              {`${lang.originally_created} `}
            </div>
            <div className={`font-semibold`}>
              {getFormattedDateTime(post.backdated)}
            </div>
          </SuperFlex>
        }

      </SuperFlex>

    )
  }
  
  return (

    <SuperFlex
      orientation="col"
      textAlign="center"
      className={`
        ${post.thumbnail && 
          `bg-gray-900/70 rounded-md my-5 p-5 text-white`
        } 
        sm:flex-row sm:text-left gap-5
      `}
    >

      <PostHeadMeta />

      <PostHeadDate />
    
    </SuperFlex>

  )
  
}