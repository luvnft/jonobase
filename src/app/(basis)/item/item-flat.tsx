
/*
jonobase
/app/(basis)/item/item-flat.tsx
"flat" style of list item
- emoji as a non-link
- date as a non-link
- kind as an optional non-link
- title as a link
- summary as a non-link
*/

import Link from "next/link"
import { Span, Paragraph, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemFlat({item, lang, view} : any) {

  let itemDate = getFormattedDate(item.created, view.show_time)

  const ItemFlatEmoji = () => {
    return (
      <Span
        className={`item-flat-emoji 
          text-2xl mr-1
        `} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemFlatDate = () => {
    return (
      <Span 
        className={`item-flat-date 
          text-md sm:text-xl text-black dark:text-white mt-2
          ${item.featured ? `text-black dark:text-yellow-500` : ``}
        `}
      >
        {item.featured && <FeaturedIcon />}
        <Span>{itemDate}</Span>
      </Span> 
    )
  }

  const ItemFlatKind = () => {
    return (
      <Span 
        className={`item-flat-kind 
          ml-1 dark:text-gray-500
        `}
      >
        ( {item.expand.kind.slug} )
      </Span>
    )
  }

  const ItemFlatTitle = () => {
    return (
      <Paragraph 
        className={`item-flat-title
          hover:underline text-2xl !mb-0
        `}
      > 
        {item.title}
      </Paragraph>
    )
  }

  const ItemFlatSummary = () => {
    return (
      <Paragraph 
        className={`item-flat-summary 
          font-serif text-black dark:text-slate-500 mt-0
        `}
      > 
        {item.summary}
      </Paragraph>
    )
  }

  const ItemFlatLink = () => {

    const target = item.url_newtab ? '_blank' : ''

    return (
      <div className="flex gap-2 justify-center sm:justify-start whitespace-nowrap">
        <Link href={item.url} target={target}>
          <div
            className={`item-card-link
              button
            `}
          >
            {lang.visit_link}
          </div>
        </Link>
      </div>
    )

  }  

  return (
    <li 
      className={`item-flat 
        h-full text-center sm:text-left hover:prose-a:!no-underline
      `}
    >  
      
      <ItemFlatEmoji />
      {view.show_date && <ItemFlatDate />}
      {view.show_kind && <ItemFlatKind />}
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemFlatTitle />
      </Link>

      <ItemFlatSummary />
      {item.url && <ItemFlatLink />}

    </li>
  )
}