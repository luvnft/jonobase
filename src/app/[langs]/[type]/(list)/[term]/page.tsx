
/*
jonopoco
/app/[langs]/[type]/(list)/[term]/page.tsx
posts list filtered by a tag with pagination
*/

import { getBase, getContentList } from '@/app/(basis)/util/data'
import ItemCard from '@/app/(basis)/item/item-card'
import ListApex from '@/app/[langs]/[type]/(list)/(libs)/list-apex'
import PageJump from '../(libs)/page-jump'
import NotFound from '@/app/not-found'

export async function generateMetadata({
  params,
  searchParams,
}: any) {

  const {app, lang} = await getBase() 

  return {
    title: `
      ${params.type}       
      ${params.term ? `[ ${params.term} ]` : ''}
      ${searchParams.p ? `(${lang.page} ${searchParams.p})` : ''}
      @ ${app.title}
    `
  }
}

export default async function Main({ params, searchParams }: any) {
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(searchParams.p) && isNaN(searchParams.l)) &&
    (searchParams.p !== undefined || searchParams.l !== undefined)) {
    return <NotFound />
  }

  const { lang } = await getBase()
  const { items } = await getContentList(
    params.type, 
    searchParams.p, 
    decodeURIComponent(params.term), 
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
            params={params}      
            term={decodeURIComponent(params.term)}
            current={searchParams.p}
            lang={lang}
            type={params.type}
          />
          
          <ListWrap>
            { items && items.length > 0 
              ? items.map((item: any) => {
                return <ItemCard key={item.id} type={false} item={item} lang={lang} />
              })
              : <li>{lang.no_items_yet}</li> 
            }
          </ListWrap>

          <PageJump             
            params={params}            
            term={decodeURIComponent(params.term) || ''}
            current={searchParams.p}
            limit={searchParams.l}            
          />
                      
        </div>
      </section>
    </>
  )
}
