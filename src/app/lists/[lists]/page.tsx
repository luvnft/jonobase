
/*
jonopoco
/app/lists/[lists]/page.tsx
list of posts by [list] (i.e. tags/topics)
with pagination
*/

import { getBase, getContentList, getFullContentCount } from '@/app/(basis)/util/data'
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
  const { p: pageNumber, l: postsPerPage } = searchParams  
  const listQuery = (decodeURIComponent(lists) === 'all') 
    ? '' : decodeURIComponent(lists)
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { app, lang } = await getBase()
  const { items } = await getContentList(
    '',             // find - don't discriminate by content
    '',             // kind - don't discriminate by kind 
    listQuery,      // list - discriminate by post list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)
  )    

   // need to determine not only the search results shown but the TOTAL results!
   const resultsCount = await getFullContentCount('', '', listQuery)

  return (
    <>
      <SectionDiv>
                    
        <LoopHead>
          <LoopApex 
            site={app.domain}
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

      <SectionDiv>
        
        <LoopShow lang={lang} items={items} />

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