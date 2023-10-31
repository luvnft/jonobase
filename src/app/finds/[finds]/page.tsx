
/*
jonopoco
/app/finds/[finds]/page.tsx
dynamically-routed finds page of search results
with pagination
*/

import { getBase, getPosts, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from '@/app/(basis)/loop/loop-head'
import { LoopApex } from '@/app/(basis)/loop/loop-apex'
import { FindResultsCount } from '@/app/(basis)/loop/loop-count'
import { LoopShow } from '@/app/(basis)/loop/loop-show'
import LoopTurn from '@/app/(basis)/loop/loop-turn'
import MenuFind from '@/app/(basis)/head/menu-find'
import NotFound from '@/app/not-found'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'

export async function generateMetadata({
  params, 
  searchParams,
}: any) {

  const {app, lang} = await getBase() 
  const { finds } = params
  const page  = searchParams.p || 1
  
  return {
    title: `      
      ${finds ?? 'all'} 
      (${lang.page}: ${page})
      @ ${app.title}
    `
  }
}

export default async function Main({ params, searchParams }: any) {

  const { finds } = params
  const { p: pageNumber, l: postsPerPage } = searchParams
  const findQuery = (decodeURIComponent(finds) === 'all') 
    ? '' : decodeURIComponent(finds)
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { app, lang } = await getBase()
  const { items } = await getPosts(
    findQuery,      // find - discriminate by content
    '',             // kind - don't discriminate by post kind
    '',             // list - don't discriminate by post list (tag)
    pageNumber,     // page - number (see above)
    postsPerPage    // page - limit (see above)
  )  
    
  // need to determine not only the search results shown but the TOTAL search results!
  const resultsCount = await getUnpagedPostsCount(findQuery, '', '')

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

      <SectionDiv>

        <MenuFind lang={lang} inputName={`search-in-finds`} />

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
