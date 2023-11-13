
/*
jonobase
/app/(basis)/item/item-mini.tsx
"mini" style of list item
- shows emoji as a non-link
- shows title as a link
- shows summary as a span
*/

import Link from "next/link"
import { Span, Paragraph } from "@/app/(basis)/util/tidy-html"
import { ItemProps } from "../util/types"

export default function ItemMini({item} : ItemProps) {  

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

  const ItemMiniSummary = () => {
    return (
      <Paragraph 
        className={`item-mini-summary
          text-md my-0
        `}
      >
        {item.summary}
      </Paragraph>
    )
  }

  const href = item.url ? item.url : `/posts/${item.slug}`
  const target = item.url_newtab ? '_blank' : ''

  return (
    <li 
      className={`item-mini
        h-full text-left hover:prose-a:!no-underline
      `}
    >

      <ItemMiniEmoji />

      <Link 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
        href={href} 
        target={target}        
      >
        <ItemMiniTitle />
      </Link>

      <ItemMiniSummary />

    </li>
  )
}