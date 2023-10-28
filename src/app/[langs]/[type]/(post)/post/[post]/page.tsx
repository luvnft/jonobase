
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
import PostApex from '../../(libs)/post-apex'
import PostHead from '../../(libs)/post-head'
import PostMain from '../../(libs)/post-main'
import PostTags from '../../(libs)/post-tags'
import PostTurn from '../../(libs)/post-turn'

export async function generateMetadata({
  params,
}: any) {

  const { app } = await getBase() 
  const { post } = await getPost(params.post, params.type)  

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

  const { lang } = await getBase()
  const { post } = await getPost(params.post, params.type)  
  
  if (Object.keys(post).length === 0) {
    return <NotFound />
  }

  return (

    <>

      <SectionDiv>
        <PostApex post={post} params={params} />
      </SectionDiv>

      <SectionDiv className={`
        border-y dark:border-gray-500
        bg-gradient-to-r 
        from-zinc-100 to-zinc-300 
        dark:from-emerald-900 dark:to-emerald-800
      `}>
        <PostHead lang={lang} post={post} />
      </SectionDiv>

      <SectionDiv>
        <PostMain post={post} />
      </SectionDiv>

      <SectionDiv className={`
        border-y dark:border-gray-500
        bg-gradient-to-r 
        from-zinc-100 to-zinc-300 
        dark:from-emerald-900 dark:to-emerald-800
      `}>
        <PostTags post={post} params={params} />
      </SectionDiv>

      <SectionDiv>
        <PostTurn lang={lang} post={post} params={params} />
      </SectionDiv>
      
    </>

  )

}