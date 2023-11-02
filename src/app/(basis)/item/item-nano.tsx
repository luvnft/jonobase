
/*
jonopoco
/app/(basis)/item/item-nano.tsx
a post "nano" (date, title, summary with optional kind)
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemNano({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ItemNanoDate = () => {

    return (
      <Span className={`
        text-black dark:text-gray-500
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
        ${item.collectionName === 'pages' ? `hidden` : ``}
        ${itemDate === '' ? `hidden` : ``}        
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}                 
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
        <br className={`hidden lg:block`} />
      </Span> 
    )
  }

  const ItemNanoEmoji = () => {
    return (
      <Span
        className={`text-2xl mx-3`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Span>
    )
  }

  const ItemNanoTitle = () => {
    return (
      <Span className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Span>
    )
  }

  return (
    <li className={`h-full text-left hover:prose-a:!no-underline row-span`}>  

      <Link 
        href={`/posts/${item.slug}`} 
        className={`          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <ItemNanoDate />
        <ItemNanoEmoji /> 
        <ItemNanoTitle />

      </Link>

    </li>
  )
}