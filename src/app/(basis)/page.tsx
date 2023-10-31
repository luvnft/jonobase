
/*
jonopoco
/app/[langs]/(home)/page.tsx
dynamically-routed find (search results) page
with paginated lists plus paginated tag filtered lists
*/

import { getBase, getPosts, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from './loop/loop-head'
import { LoopApex } from './loop/loop-apex'
import { FindResultsCount } from '@/app/(basis)/loop/loop-count'
import { LoopShow } from './loop/loop-show'
import LoopTurn from './loop/loop-turn'
import NotFound from '@/app/not-found'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'
import { sanitize } from 'isomorphic-dompurify'
import { getProse } from './util/func'

export async function generateMetadata({
  params, searchParams,
}: any) {

  const {app, lang} = await getBase() 
  
  return {
    title: `      
      ${app.title} - ${app.tagline}
    `
  }
}

export default async function Main({ params, searchParams }: any) {

  const { p: pageNumber, l: postsPerPage } = searchParams  
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { app, lang } = await getBase()

  const { items } = await getPosts(
    '',             // find - don't discriminate by content
    '',             // kind - don't discriminate by post kind 
    '',             // list - don't discriminate by list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)    
  )  
    
  // need to determine not only the search results shown but the TOTAL search results!
  const resultsCount = await getUnpagedPostsCount('', '', '')

  const HomeIntro = () => {

    const homeIntro = app.homepage_intro 
      ? sanitize(app.homepage_intro, { ADD_ATTR: ['target']})
      : ''
    
    return (
      <article 
        className={`text-4xl py-16`} 
        dangerouslySetInnerHTML={{__html: homeIntro}} 
      />
    )

  }

  const HomeOutro = () => {

    const homeOutro = app.homepage_outro 
      ? sanitize(app.homepage_outro, { ADD_ATTR: ['target']})
      : ''
    
      return (
        <article 
          className={`py-10 ${getProse()}`}
          dangerouslySetInnerHTML={{__html: homeOutro}} 
        />
      )
    
  }

  return (
    <>

      <SectionDiv className={`drop-shadow-xl`}> 

        <LoopHead>
          <LoopApex 
            site={app.slug}
            lang={lang}
            params={params}              
            current={pageNumber}              
          />          
          <FindResultsCount 
            label={lang.posts} 
            resultsCount={resultsCount} 
          />
        </LoopHead>

      </SectionDiv>

      <SectionDiv className={`
        bg-gradient-to-r 
        from-blue-300 to-blue-100 
        dark:from-slate-900 dark:to-slate-800 
        text-black dark:text-gray-300 mt-0 mb-0
        drop-shadow-xl 
      `}>
        <HomeIntro />
      </SectionDiv>  

      <SectionDiv className={`my-5 lg:my-2`}>       

        <LoopShow lang={lang} items={items} />

        <LoopTurn 
          params={params}            
          current={pageNumber}
          limit={postsPerPage}           
        />          
                      
      </SectionDiv>   

      <SectionDiv className={`
        bg-gradient-to-r 
        from-zinc-100 to-zinc-300 
        dark:from-emerald-900 dark:to-emerald-800 
        text-black dark:text-gray-300 mb-0
        drop-shadow-xl prose-headings:mt-0
      `}
      >
        <HomeOutro />
      </SectionDiv>  
          
    </>
  )
}
