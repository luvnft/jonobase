
/*
jonobase
/app/(basis)/item/item-null.tsx
"null" style of list item
- shows just the title as a link
- if there's an url then go to the link directly
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"
import { ItemProps } from "../util/types"

export default function ItemNull({item} : ItemProps) {

  const ItemNullTitle = () => {
    return (
      <Span 
        className={`item-null-title
          hover:underline text-2xl
        `}
      > 
        {item.emoji} {item.title}
      </Span>
    )
  }

  const href = item.url ? item.url : `/posts/${item.slug}`
  const target = item.url_newtab ? '_blank' : '_self'

  return (
    <li
      className={`item-null
        h-full text-left hover:prose-a:!no-underline
      `}
    >

      <Link 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
        href={href} 
        target={target}        
      >
        <ItemNullTitle />
      </Link>

    </li>
  )
}