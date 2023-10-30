
/*
jonopoco
/app/kinds/[kinds]/page.tsx
list of posts by [kind] (i.e. minis, notes, pages, works)
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
  const { p: pageNumber, l: postsPerPage } = searchParams  
  const kindQuery = (decodeURIComponent(kinds) === 'all') 
    ? '' : decodeURIComponent(kinds)
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { app, lang } = await getBase()
  const { items } = await getContentList(
    '',             // find - don't discriminate by content
    kindQuery,      // kind - discriminate by post kind or not)
    '',             // list - don't discriminate by list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)
  )    

  // need to determine not only the search results shown but the TOTAL results!
  const resultsCount = await getFullContentCount('', kindQuery, '')  

  return (
    <>

      <SectionDiv>
                    
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