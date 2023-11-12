
/*
jonobase
/app/(basis)/item/item-lite.tsx
"lite" style of list item
- emoji as a non-link
- title as a link
- date as a non-link
*/

import Link from "next/link"
import { Span, Paragraph, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"
import { ItemProps } from "../util/types"

export default function ItemLite({item, lang, view} : ItemProps) {

  let itemDate = getFormattedDate(item.created, view.show_time)

  const ItemLiteEmoji = () => {
    return (
      <Span
        className={`item-lite-emoji
          text-2xl mr-1
        `} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemLiteDate = () => {
    return (
      <Paragraph 
        className={`item-lite-date
          text-sm text-black dark:text-gray-500
          ${item.featured ? `text-black dark:text-yellow-500` : ``}
        `}
      >
        {item.featured && <FeaturedIcon />}
        <Span>{itemDate}</Span>
      </Paragraph> 
    )
  }

  const ItemLiteTitle = () => {
    return (
      <Span className={`item-lite-title
        hover:underline text-2xl
      `}> 
        {item.title}
      </Span>
    )
  }

  const target = (item.url && item.url_newtab) ? '_blank' : ''

  return (
    <li 
      className={`item-lite
        h-full text-center sm:text-left hover:prose-a:!no-underline
      `}
    >

      <ItemLiteEmoji />

      <Link 
        href={`/posts/${item.slug}`} 
        className={`item-lite-title-link
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >
        <ItemLiteTitle />
      </Link>

      {view.show_date && <ItemLiteDate />}

      {item.url && ( 
        <Paragraph 
          className={`item-lite-url 
            mb-5
          `}
        >
          <Link
            className={`button`}
            href={item.url}
            target={target}
          >
            {lang.visit_link}
          </Link> 
        </Paragraph>
      )}

    </li>
  )
}