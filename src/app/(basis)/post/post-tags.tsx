
/*
jonobase
/app/(basis)/post/post-tags.tsx
tags (taxonomy) for single "post" pages
*/

import Link from "next/link";
import { Span } from "../util/tidy-html";

interface ListProps {
  id: string,
  slug: string,
}

interface PostTagProps {
  list: ListProps
}

interface PostTagsProps {
  lang: { [x: string]: string},
  post: any
}

export default function PostTags({lang, post}: PostTagsProps) {
  
  const { expand : { lists } } = post

  const PostTagLink = ({list} : PostTagProps) => {
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
      { lists && lists.map((list: ListProps) => 
        <PostTagLink key={list.id} list={list} /> 
      )}
    </aside>
  )
  
}