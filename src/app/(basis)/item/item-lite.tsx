
/*
jonobase
/app/(basis)/item/item-lite.tsx
"lite" style of list item
- emoji as a non-link
- title as a link
- date as a non-link
*/

import Link from "next/link"
import { Span, Paragraph } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemLite({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)

  const ItemLiteEmoji = () => {
    return (
      <Span
        className={`text-2xl mr-1`} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemLiteDate = () => {
    return (
      <Paragraph className={`
        text-sm text-black dark:text-gray-500 mt-2
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
      </Paragraph> 
    )
  }

  const ItemLiteTitle = () => {
    return (
      <Span className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Span>
    )
  }

  return (
    <li className={`h-full text-center md:text-left hover:prose-a:!no-underline`}>  
      
      <ItemLiteEmoji />      
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemLiteTitle />
      </Link>

      {item.show_date && <ItemLiteDate />}

    </li>
  )
}