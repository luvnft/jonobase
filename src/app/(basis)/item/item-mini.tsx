
/*
jonobase
/app/(basis)/item/item-mini.tsx
"mini" style of list item
- shows emoji as a non-link
- shows title as a link
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export default function ItemMini({item} : any) {

  const ItemMiniEmoji = () => {
    return (
      <Span
        className={`item-mini-emoji 
          text-2xl mr-1
        `} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemMiniTitle = () => {
    return (
      <Span 
        className={`item-mini-title
          hover:underline text-2xl
        `}
      > 
        {item.title}
      </Span>
    )
  }

  return (
    <li 
      className={`item-mini
        h-full text-left hover:prose-a:!no-underline
      `}
    >

      <ItemMiniEmoji />

      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemMiniTitle />
      </Link>

    </li>
  )
}