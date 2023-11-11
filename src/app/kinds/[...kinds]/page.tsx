
/*
jonobase
/app/kinds/[kinds]/page.tsx
list of posts by [kind] (i.e. minis, notes, pages, works)
with pagination
*/

import { getBase, getPosts, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from '@/app/(basis)/loop/loop-head'
import { LoopApex } from '@/app/(basis)/loop/loop-apex'
import { FindResultsCount } from '@/app/(basis)/loop/loop-count'
import { LoopShow } from '@/app/(basis)/loop/loop-show'
import LoopTurn from '@/app/(basis)/loop/loop-turn'
import NotFound from '@/app/not-found'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'

export async function generateMetadata({
  params,
  searchParams,
}: any) {

  const {app, lang} = await getBase() 

  const { kinds } = params
  const page  = searchParams.p || 1

  return {
    title: `
      ${kinds ?? 'all'} 
      (${lang.page}: ${page}) 
      @ ${app.title}`
  }
}

export default async function Main({ params, searchParams }: any) {

  const { kinds } = params
  const { p: pageNumber, l } = searchParams  
  const kindQuery = (decodeURIComponent(kinds) === 'all') 
    ? '' : decodeURIComponent(kinds)

  const { app, lang } = await getBase()  

  const postsPerPage = isNaN(l) ? app.kind_list_limit : l
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  
  const { items } = await getPosts(
    '',             // find - don't discriminate by content
    kindQuery,      // kind - discriminate by post kind or not)
    '',             // list - don't discriminate by list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)
  )    

  // need to determine not only the search results shown but the TOTAL results!
  const resultsCount = await getUnpagedPostsCount('', kindQuery, '')
  
  // view options object for the loopshow
  const view = {
    type: app.kind_list_type,
    show_date: true, 
    show_time: false, 
    show_kind: false  
  }

  return (
    <>

      <SectionDiv className={`my-5`}>
                    
        <LoopHead>
          <LoopApex 
            site={app.slug}
            lang={lang}
            params={params}              
            current={pageNumber}              
          />          
          <FindResultsCount 
            label={lang.search_results} 
            resultsCount={resultsCount} 
          />
        </LoopHead>

      </SectionDiv>
      
      <SectionDiv className={`bg-zinc-200 dark:bg-zinc-700`}>
        
        <LoopShow           
          items={items} 
          lang={lang} 
          view={view}
        />
      
      </SectionDiv>
        
      <SectionDiv>

        <LoopTurn             
          params={params}            
          current={pageNumber}                        
          limit={postsPerPage}          
        />
                      
      </SectionDiv>

    </>
  )
}