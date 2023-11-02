
/*
jonopoco
/app/(basis)/loop/loop-turn.tsx
pagination for loop-type pages
*/

import Link from "next/link"
import { getUnpagedPostsCount } from "@/app/(basis)/util/data"

export default async function LoopTurn({
  params,         // URL dynamic folder params
  current = 1,    // current page # (1 by default)
  limit = 6,      // posts per page (6 by default)
}: any) {  

  const checkFinds = params.finds 
    ? params.finds 
    : ''

  const checkKinds = params.kinds 
    ? params.kinds
    : ''  

  const checkLists = params.lists
    ? params.lists
    : ''

  const postCount = await getUnpagedPostsCount(
      checkFinds, 
      checkKinds, 
      checkLists,
  )  
  
  const pageLimit = parseInt(limit, 10) || 6  
  const pageCount = Math.ceil(postCount / pageLimit) 
  
  let pagination = []

  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i)
  }

  return (
    
    pagination.length > 1 && (
      <ul className="flex flex-row my-5">
        {pagination.map(page =>
          <li 
            key={`pagination-${page}`} 
            className={`mr-2`}
          >
            <Link         
              className={`pagination button ${page == current ? 'current' : ''}`}               
              href={`?p=${page}&l=${pageLimit}`} 
            > {page} </Link>
          </li>
        )}
      </ul>
    )

  )
  
}