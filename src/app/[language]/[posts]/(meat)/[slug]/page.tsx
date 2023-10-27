
/*
jonopoco
/app/[posts]/(meat)/[slug]/page.tsx
individual post "meat" (content) 
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
import { Section } from '@/app/(basis)/util/tidy-html'
import NotFound from '@/app/not-found'
import MeatApex from '../(components)/meat-apex'
import MeatHead from '../(components)/meat-head'
import MeatMain from '../(components)/meat-main'
import MeatTags from '../(components)/meat-tags'
import MeatTurn from '../(components)/meat-turn'

export async function generateMetadata({
  params,
}: any) {

  const { app } = await getBase() 
  const { post } = await getPost(params.slug, params.posts)  

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
  const { post } = await getPost(params.slug, params.posts)  
  
  if (Object.keys(post).length === 0) {
    return <NotFound />
  }

  return (

    <>

      <Section>
        <MeatApex post={post} params={params} />
      </Section>

      <Section className={`bg-gray-100`}>
        <MeatHead lang={lang} post={post} />
      </Section>

      <Section>
        <MeatMain post={post} />
      </Section>

      <Section className={`bg-gray-100`}>
        <MeatTags post={post} params={params} />
      </Section>

      <Section>
        <MeatTurn lang={lang} post={post} params={params} />
      </Section>
      
    </>

  )

}