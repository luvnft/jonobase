
/*
jonopoco
/app/[langs]/[type]/(list)/(libs)/page-jump.tsx
jump (pagination) for lists
*/

import Link from "next/link"
import { getFullContentCount } from "@/app/(basis)/util/data"

export default async function PageJump({
  params,         // URL dynamic folder params
  current = 1,    // current page # (1 by default)
  limit = 6,      // posts per page (6 by default)
  query = ''      // query (as in find/search term)
}: any) {

  const checkType = params.type 
    ? params.type 
    : '%'  
  
  const checkQuery = params.find 
    ? params.find 
    : query
  
  const postCount = await getFullContentCount(
      checkType, 
      params.term, 
      checkQuery
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