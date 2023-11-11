
/*
jonobase
/app/(basis)/item/item-null.tsx
"null" style of list item
- shows just the title as a link
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export default function ItemNull({item} : any) {

  const ItemNullTitle = () => {
    return (
      <Span 
        className={`item-null-title
          hover:underline text-2xl
        `}
      > 
        {item.title}
      </Span>
    )
  }

  return (
    <li
      className={`item-null
        h-full text-left hover:prose-a:!no-underline
      `}
    >
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemNullTitle />
      </Link>

    </li>
  )
}