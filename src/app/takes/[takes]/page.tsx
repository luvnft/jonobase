
/*
jonopoco
/app/[langs]/(home)/page.tsx
dynamically-routed find (search results) page
with paginated lists plus paginated tag filtered lists
*/

import { getTake, getBase, getPosts, getUnpagedPostsCount } from '@/app/(basis)/util/data'
import { LoopHead } from '@/app/(basis)/loop/loop-head'
import { LoopApex } from '@/app/(basis)/loop/loop-apex'
import { FindResultsCount } from '@/app/(basis)/loop/loop-count'
import ViewShow from '@/app/(basis)/view/view-show'
import { SectionDiv } from '@/app/(basis)/util/tidy-html'
import NotFound from '@/app/not-found'

export async function generateMetadata({
  params
}: any) {

  const { app } = await getBase()
  const { take } = await getTake(params.takes)
  
  return {
    title: `${take.public_name} @ ${app.title}`
  }
}

export default async function Main({ params }: any) {

  const { app, lang } = await getBase()

  /* the total of all the site's published post counts */
  const resultsCount = await getUnpagedPostsCount('', '', '')

  /* getting a "take" which bundles the views */
  const { take } = await getTake(params.takes)
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
