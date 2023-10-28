
/*
jonopoco
/app/[langs]/[type]/(post)/(libs)/post-tags.tsx
tags (taxonomy) for single "post" pages

*/

import Link from "next/link";

export default async function PostTags({post, params}: any) {
  
  const { expand : { terms }} = post;
  
  return (        
    <aside>
      { terms && terms.map((term: any) => 
        <Link 
          key={term.id} 
          className={`button !mr-2 !my-2 dark:bg-emerald-900 dark:text-white`} 
          href={`/${params.langs}/${post.post_type}/${term.slug}`}
        > 
          {term.slug} 
        </Link> 
      )}
    </aside>
  )
  
}