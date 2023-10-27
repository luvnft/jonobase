
/*
jonopoco
/app/(basis)/list/page-jump.tsx
jump (pagination) for lists
*/

import Link from "next/link"
// import { getFullContentCount } from "../util/data"

export default async function PageJump({type, topic = '', current = 1, limit = 6}: any) {

  const pageLimit = parseInt(limit, 10) || 6
  // const postCount = await getFullContentCount(type, topic)
  const postCount = 20
  // const pageCount = Math.ceil (postCount / pageLimit) 
  
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
              
              href={`/${type}/?t=${topic}&p=${page}&l=${limit}`} 
            > {page} </Link>
          </li>
        )}
      </ul>
    )

  )
  
}