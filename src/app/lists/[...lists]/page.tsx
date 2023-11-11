
/*
jonobase
/app/lists/[lists]/page.tsx
list of posts by [list] (i.e. tags/topics)
with pagination
*/

import { getBase, getPosts, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from '@/app/(basis)/loop/loop-head'
import { LoopApex } from '@/app/(basis)/loop/loop-apex'
import { LoopCount } from '@/app/(basis)/loop/loop-count'
import { LoopShow } from '@/app/(basis)/loop/loop-show'
import LoopTurn from '@/app/(basis)/loop/loop-turn'
import NotFound from '@/app/not-found'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'

export async function generateMetadata({
  params,
  searchParams,
}: any) {

  const {app, lang} = await getBase() 

  const { lists } = params
  const page  = searchParams.p || 1

  return {
    title: `
      ${lists ?? 'all'} 
      (${lang.page}: ${page}) 
      @ ${app.title}`
  }
}

export default async function Main({ params, searchParams }: any) {

  const { lists } = params
  const { p: pageNumber, l } = searchParams  
  const listQuery = (decodeURIComponent(lists) === 'all') 
    ? '' : decodeURIComponent(lists)

  const { app, lang } = await getBase()
  const postsPerPage = isNaN(l) ? app.list_list_limit : l

  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }

  const { items } = await getPosts(
    '',             // find - don't discriminate by content
    '',             // kind - don't discriminate by kind 
    listQuery,      // list - discriminate by post list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)
  )

  // need to determine not only the search results shown but the TOTAL results!
  const resultsCount = await getUnpagedPostsCount('', '', listQuery)

  // view options object for the loopshow
  const view = {
    type: app.list_list_type,
    show_date: true, 
    show_time: true, 
    show_kind: true  
  }   

  return (
    <>
      <SectionDiv className={`page-lists-apex my-5`}>
                    
        <LoopHead>
          <LoopApex 
            site={app.slug}
            lang={lang}
            params={params}
            current={pageNumber}
          />
          <LoopCount 
            label={lang.search_results} 
            resultsCount={resultsCount} 
          />
        </LoopHead>

      </SectionDiv>

      <SectionDiv className={`page-lists-loop bg-zinc-50 dark:bg-zinc-950`}>
        
        <LoopShow 
          items={items} 
          lang={lang}
          view={view}
        />

      </SectionDiv>

      <SectionDiv className={`page-lists-turn`}>
        
        <LoopTurn
          params={params}
          current={pageNumber}
          limit={postsPerPage}
        />

      </SectionDiv>
    </>
  )
}