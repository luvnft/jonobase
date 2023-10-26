
/*
jonopoco
/app/notes/(list)/tagged/[tagged]/page.tsx
notes list filtered by a tag with pagination
*/

import { getBase, getContentList } from '@/app/basis/util/data'
import ItemCard from '@/app/basis/list/list-card'
import ListApex from '@/app/basis/list/list-apex'
import PageJump from '@/app/basis/list/page-jump'

const listType = 'notes'

export async function generateMetadata({
  params,
  searchParams,
}: any) {

  const {app, lang} = await getBase() 

  return {
    title: `
      ${lang[listType]}       
      ${params.tagged ? `[ ${params.tagged} ]` : ''}
      ${searchParams.p ? `(${lang.page} ${searchParams.p})` : ''}
      @ ${app.title}
    `
  }
}

export default async function PostList({ params, searchParams }: any) {
  
  const { lang } = await getBase()
  const content = await getContentList(
    listType, 
    searchParams.p, 
    params.tagged, 
    searchParams.l
  )
  const { items } = content || []

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
            topic={params.tagged}
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
            topic={params.tagged}
            current={searchParams.p}
            limit={searchParams.l}            
          />
                      
        </div>
      </section>
    </>
  )
}
