
/*
jonopoco
/app/[langs]/[type]/(post)/post/[post]/page.tsx
individual post "post" (content) 
- apex (breadcrumbs)
- head (top header with metadata)
- main (content)
  - path (location-based storytelling - for v2)
- tags (post taxonomy)
- turn (post page-turner to previous or next post)
- turn (post page-turner to previous or next post, for post_type)
- turn (post page-turner to previous or next post, for series)
*/

import { getBase, getPost } from '@/app/(basis)/util/data'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'
import NotFound from '@/app/not-found'
import PostApex from '@/app/(basis)/post/post-apex'
import PostHead from '@/app/(basis)/post/post-head'
import { PostMain } from '@/app/(basis)/post/post-main'
import PostTags from '@/app/(basis)/post/post-tags'
import PostTurn from '@/app/(basis)/post/post-turn'

export async function generateMetadata({
  params,
}: any) {

  const { app } = await getBase() 
  const { post } = await getPost(params.posts)  

  if (Object.keys(post).length === 0) {
    return {
      title: `${app.title}`
    }
  }  

  if (Object.keys(post).indexOf('title') > -1) {
    return {
      title: `${post.title} @ ${app.title}`
    }
  } 

}

export default async function Main({ params }: any) {

  const { app, lang } = await getBase()
  const { post } = await getPost(params.posts)  

  const { lists } = post
  
  if (Object.keys(post).length === 0) {
    return <NotFound />
  }    

  return (

    <>

      <SectionDiv className={`my-5`}>
        <PostApex siteName={app.slug} post={post} params={params} />
      </SectionDiv>

      <SectionDiv className={`
        border-y dark:border-gray-500
        bg-gradient-to-r 
        from-zinc-100 to-zinc-300 
        dark:from-emerald-900 dark:to-emerald-800
        drop-shadow-md
      `}>
        <PostHead lang={lang} post={post} />
      </SectionDiv>

      <SectionDiv>
        <PostMain post={post} />
      </SectionDiv>
      
      { lists.length > 0 && 
        <SectionDiv className={`
          border-y dark:border-gray-500
          bg-gradient-to-r 
          from-zinc-100 to-zinc-300 
          dark:from-emerald-900 dark:to-emerald-800
          drop-shadow-md py-5
        `}>
          <PostTags lang={lang} post={post} />
        </SectionDiv> 
      }

      <SectionDiv className={`py-5`}>
        <PostTurn lang={lang} post={post} params={params} />
      </SectionDiv>
      
    </>

  )

}