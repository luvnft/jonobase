
/*
jonobase
/app/[langs]/(home)/page.tsx
dynamically-routed find (search results) page
with paginated lists plus paginated tag filtered lists
*/

import { getBase, getHomePage, getPosts, getTake, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from './loop/loop-head'
import { LoopApex } from './loop/loop-apex'
import { FindResultsCount } from '@/app/(basis)/loop/loop-count'
import ViewShow from './view/view-show'
import NotFound from '@/app/not-found'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'

export async function generateMetadata() {

  const { app } = await getBase()  
  
  return {
    title: `${app.title} - ${app.tagline}`
  }
}

export default async function Main({ params }: any) {

  const { lang } = await getBase()
  const { app: home } = await getHomePage() 
  const homepage = home.expand?.homepage_content 

  /* the total of all the site's published post counts */
  const resultsCount = await getUnpagedPostsCount('', '', '')

  /* getting a "take" which bundles the views */
  const { take } = await getTake(homepage.slug)
  const views = take.expand?.views
  
  if (take.public_name === '') return (<NotFound />)

  const viewLoop = async () => {
    const promises = views.map( async (view : any) => {
      const { find, kind, list, limit, id } = view
      const { items } = await getPosts(find, kind, list, 1, limit)
      return { id, view, items }
    })

    const collections = await Promise.all(promises)
    return collections
    
  }

  const takeViews = await viewLoop()

  return (
    <>

      <SectionDiv className={`drop-shadow-xl my-5`}> 

        <LoopHead>
          <LoopApex 
            site={take.public_name}
            lang={lang}
            params={params}
          />          
          <FindResultsCount 
            label={lang.posts} 
            resultsCount={resultsCount} 
          />
        </LoopHead>
        
      </SectionDiv>

      {takeViews && takeViews.map(takeView =>         

        <ViewShow 
          key={takeView.id}
          lang={lang}
          takeView={takeView} 
        />        
      
      )}
          
    </>
  )
}
