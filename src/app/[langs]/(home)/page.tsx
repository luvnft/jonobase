
/*
jonopoco
/app/[langs]/(home)/page.tsx
dynamically-routed find (search results) page
with paginated lists plus paginated tag filtered lists
*/

import { getBase, getContentList, getFullContentCount } from '@/app/(basis)/util/data'
import ListApex from '../[type]/(list)/(libs)/list-apex'
import ItemCard from '@/app/(basis)/item/item-card'
import PageJump from '../[type]/(list)/(libs)/page-jump'
import NotFound from '@/app/not-found'
import { SectionDiv, Span, StandardFlex } from '@/app/(basis)/util/tidy-html'
import { sanitize } from 'isomorphic-dompurify'

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
  
  // reject any non-numeric injections in the URL bar
  if (
    (isNaN(pageNumber) && isNaN(postsPerPage)) &&
    (pageNumber !== undefined || postsPerPage !== undefined)) {
    return <NotFound />
  }
  
  const { app, lang } = await getBase()

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
    `%`
  )  
    
  // need to determine not only the search results shown but the TOTAL search results!
  const resultsCount = await getFullContentCount('%', '', '%')

  const FindResultsCount = () => {    
    return (
      <aside className={`font-sans text-lg`}>        
        <Span>{lang.posts} : {resultsCount}</Span>        
      </aside>
    )
  }

  const HomeIntro = () => {

    const homeIntro = app.homepage_intro 
      ? sanitize(app.homepage_intro, { ADD_ATTR: ['target']})
      : ''
    
    return (
      <article 
        className={`font-sans text-4xl`} 
        dangerouslySetInnerHTML={{__html: homeIntro}} 
      />
    )

  }

  const HomeList = ({children}: any) => {
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

  const HomeOutro = () => {

    const homeOutro = app.homepage_outro 
      ? sanitize(app.homepage_outro, { ADD_ATTR: ['target']})
      : ''
    
      return (
        <article dangerouslySetInnerHTML={{__html: homeOutro}} />
      )
    
  }

  return (
    <>

      <SectionDiv> 

        <StandardFlex>
          <ListApex 
            params={params}
            term={''}
            current={pageNumber}
            lang={lang}
            type={'home'}
          />          
          <FindResultsCount />
        </StandardFlex>

      </SectionDiv>

      <SectionDiv className={`
        bg-gradient-to-r 
        from-blue-300 to-blue-100 
        dark:from-slate-900 dark:to-slate-800 
        text-black dark:text-gray-300 mb-0
      `}>
        <HomeIntro />
      </SectionDiv>  

      <SectionDiv>        

        <HomeList>
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
        </HomeList>

        <PageJump 
          params={params}            
          current={pageNumber}
          limit={postsPerPage} 
          query={'%'}         
        />          
                      
      </SectionDiv>   

      <SectionDiv className={`
          bg-gradient-to-r 
          from-green-200 to-green-100 
          dark:from-emerald-900 dark:to-emerald-800 
          text-black dark:text-gray-300 mb-0`
        }
      >
        <HomeOutro />
      </SectionDiv>  
          
    </>
  )
}
