
/*
jonopoco
/app/[langs]/find/[find]/page.tsx
dynamically-routed find (search results) page
with paginated lists plus paginated tag filtered lists
*/

import { getBase, getContentList, getFullContentCount } from '@/app/(basis)/util/data'
import ListApex from '../../[type]/(list)/(libs)/list-apex'
import ItemCard from '@/app/(basis)/item/item-card'
import PageJump from '../../[type]/(list)/(libs)/page-jump'
import MenuFind from '@/app/(basis)/head/menu-find'
import NotFound from '@/app/not-found'

export async function generateMetadata({
  params, searchParams,
}: any) {

  const {app, lang} = await getBase() 
  
  return {
    title: `
      ${lang.search} 
      ${params.find} 
      ${searchParams.p ? `${lang.page} ${searchParams.p}` : ''}
      @ ${app.title}
    `
  }
}

export default async function Main({ params, searchParams }: any) {

  const { p: pageNumber, l: postsPerPage } = searchParams
  const query = params.find === 'all' ? '%' : decodeURIComponent(params.find)
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { lang } = await getBase()

  const { items } = await getContentList(
    // don't discriminate by post type (e.g. links, pages, etc.)
    '%',
    // current page of results
    pageNumber,
    // don't discriminate by post term (i.e. tag)
    '',
    // number of posts to show per page
    postsPerPage,    
    // sanitized query before finding
    query
  )  
    
  // need to determine not only the search results shown but the TOTAL search results!
  const resultsCount = await getFullContentCount('%', '', query)

  const FindHead = ({children}: any) => {
    return (
      <div className="flex flex-row justify-between mb-5">{children}</div>
    )
  }

  const FindResultsCount = () => {    
    return (
      <aside className={`font-sans texst-sm`}>
        {lang.search_results} : {resultsCount}
      </aside>
    )
  }

  const ListWrap = ({children}: any) => {
    return (
      <ul className={`grid gap-5 mt-5
        grid-cols-1 items-center place-content-center 
        ${items.length >= 2 && `sm:grid-cols-2`} 
        ${items.length >= 3 && `lg:grid-cols-3`}
      `}>
        {children}
      </ul>
    )
  }  

  return (
    <>
      <section>
        <div>          

          <FindHead>
            <ListApex 
              params={params}
              term={''}
              current={pageNumber}
              lang={lang}
              type={'find'}
            />          
            <FindResultsCount />
          </FindHead>

          <MenuFind lang={lang} />
          
          <ListWrap>
            { items && items.length > 0 
              ? items.map((item: any) => {
                return (
                  <ItemCard
                    type={true}                     
                    key={item.id} 
                    item={item} 
                    lang={lang} 
                  />
                )
              })
              : <li>{lang.no_items_yet}</li> 
            }
          </ListWrap>

          <PageJump 
            params={params}            
            term={''}
            current={pageNumber}
            limit={postsPerPage}
          />          
                      
        </div>
      </section>
    </>
  )
}
