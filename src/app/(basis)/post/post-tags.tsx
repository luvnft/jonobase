
/*
jonopoco
/app/(basis)/post/post-tags.tsx
tags (taxonomy) for single "post" pages
*/

import Link from "next/link";
import { Span } from "../util/tidy-html";

export default function PostTags({lang, post, params}: any) {
  
  const { expand : { lists } } = post  
  
  return (        
    <aside>
      { lists && lists.map((list: any) => 
        <Link 
          key={list.id} 
          className={`button !mr-2 !my-2 text-sm md:text-lg dark:bg-emerald-900 dark:text-white`} 
          href={`/lists/${list.slug}`}
        > 
          <Span className={`sr-only`}>{lang.tagged_in_list} </Span>{list.slug} 
        </Link> 
      )}
    </aside>
  )
  
}