
/*
jonopoco
/app/(basis)/item/item-lite.tsx
"lite" style of item card 
- first line: date + emoji (optional) + kind (optional)
- second line: title
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemLite({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ItemLiteDate = () => {

    return (
      <Span className={`
        text-black dark:text-gray-500 mt-2
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
      </Span> 
    )
  }

  const ItemLiteEmoji = () => {
    return (
      <Span
        className={`text-2xl mx-3`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Span>
    )
  }

  const ItemLiteTitle = () => {
    return (
      <Line className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Line>
    )
  }

  const ItemLiteKind = () => {

    return (
      <Span className={`mr-2`}>
        ( {item.expand.kind.slug} )
      </Span>
    )
  }

  return (
    <li className={`text-center md:text-left hover:prose-a:!no-underline`}>  
      
      <ItemLiteDate />
      <ItemLiteEmoji /> 
      <ItemLiteKind />
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemLiteTitle />

      </Link>

    </li>
  )
}