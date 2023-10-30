
/*
jonopoco
/app/(basis)/post/post-tags.tsx
tags (taxonomy) for single "post" pages
*/

import Link from "next/link";

export default function PostTags({post, params}: any) {
  
  const { expand : { lists } } = post  
  
  return (        
    <aside>
      { lists && lists.map((list: any) => 
        <Link 
          key={list.id} 
          className={`button !mr-2 !my-2 dark:bg-emerald-900 dark:text-white`} 
          href={`/lists/${list.slug}`}
        > 
          {list.slug} 
        </Link> 
      )}
    </aside>
  )
  
}