
/*
jonobase
/app/(basis)/post/post-tags.tsx
tags (taxonomy) for single "post" pages
*/

import Link from "next/link";
import { Span } from "../util/tidy-html";

export default function PostTags({lang, post}: any) {
  
  const { expand : { lists } } = post

  const PostTagLink = ({list} : any) => {
    return (
      <Link           
        className={`post-tag 
          button !mr-2 !my-2 text-sm sm:text-lg
          dark:bg-emerald-900 dark:text-white
        `} 
        href={`/lists/${list.slug}`}
      > 
        <Span className={`sr-only`}>
          {lang.tagged_in_list} 
        </Span>
        {list.slug} 
      </Link>
    )
  }
  
  return (
    <aside
      className={`post-tags`}
    >
      { lists && lists.map((list: any) => 
        <PostTagLink key={list.id} list={list} /> 
      )}
    </aside>
  )
  
}