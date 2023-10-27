
/*
jonopoco
/app/(basis)/meat/meat-tags.tsx
tags (taxonomy) for single "meat" pages

*/

import Link from "next/link";

export default async function MeatTags({params, post}: any) {
  
  const { expand : { topics }} = post;
  
  return (        
    <aside>
      { topics.map((topic: any) => 
        <Link 
          key={topic.id} 
          className={`button !mr-2 !mb-2`} 
          href={`
            /${params.language}
            /${post.post_type}
            /tagged
            /${topic.slug}
          `}
        > 
          {topic.slug} 
        </Link> 
      )}
    </aside>
  )
  
}