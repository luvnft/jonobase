
/*
jonopoco
/app/(basis)/item/item-nano.tsx
a post "nano" (date, title, summary with optional kind)
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemMini({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ItemMiniDate = () => {

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

  const ItemMiniEmoji = () => {
    return (
      <Span
        className={`text-2xl mx-3`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Span>
    )
  }

  const ItemMiniTitle = () => {
    return (
      <Line className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Line>
    )
  }

  const ItemMiniKind = () => {

    console.log("====", item)
    return (
      <Span className={`mr-2`}>
        ( {item.expand.kind.slug} )
      </Span>
    )
  }
  const ItemMiniSummary = () => {
    return (
      <Line className={`text-black dark:text-slate-500 text-lg`}> 
        {item.summary}
      </Line>
    )
  }

  return (
    <li className={`h-full text-center sm:text-left hover:prose-a:!no-underline`}>  
      
      <ItemMiniDate />
      <ItemMiniEmoji /> 
      <ItemMiniKind />
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemMiniTitle />

      </Link>
      <ItemMiniSummary />

    </li>
  )
}