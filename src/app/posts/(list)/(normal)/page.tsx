
/*
jonopoco
/app/posts/(list)/(normal)/page.tsx
posts list with paginated lists plus paginated tag filtered lists
*/

import { getBase, getContentList } from '../../../basis/util/data'
import ItemCard from '@/app/basis/list/list-card'
import ListApex from '@/app/basis/list/list-apex'
import PageJump from '@/app/basis/list/page-jump'
import NotFound from '@/app/not-found'

const listType = 'posts'

export async function generateMetadata({
  searchParams,
}: any) {

  const {app, lang} = await getBase() 

  return {
    title: `
      ${lang.notes}       
      ${searchParams.t ? `[ ${searchParams.t} ]` : ''}
      ${searchParams.p ? `(${lang.page} ${searchParams.p})` : ''}
      @ ${app.title}
    `
  }
}

export default async function PostList({ searchParams }: any) {
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(searchParams.p) && isNaN(searchParams.l)) &&
    (searchParams.p !== undefined || searchParams.l !== undefined)) {
    return <NotFound />
  }
  
  const { lang } = await getBase()

  const { items } = await getContentList(
    listType, 
    searchParams.p, 
    searchParams.t, 
    searchParams.l
  ) 

  const ListWrap = ({children}: any) => {
    return (
      <ul className={`grid gap-5 
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
                    
          <ListApex 
            lang={lang}
            type={listType}
            topic={searchParams.t}
            current={searchParams.p}
          />
          
          <ListWrap>
            { items && items.length > 0 
              ? items.map((item: any) => {
                return <ItemCard key={item.id} item={item} lang={lang} />
              })
              : <li>{lang.no_items_yet}</li> 
            }
          </ListWrap>

          <PageJump 
            type={listType}            
            topic={searchParams.t || ''}
            current={searchParams.p}
            limit={searchParams.l}            
          />
                      
        </div>
      </section>
    </>
  )
}
