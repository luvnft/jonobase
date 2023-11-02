
/*
jonopoco
/app/(basis)/item/item-flat.tsx
"flat" style of item card 
- first line: date + emoji (optional) + kind (optional)
- second line: title
- third line: summary
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemFlat({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ItemFlatDate = () => {

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

  const ItemFlatEmoji = () => {
    return (
      <Span
        className={`text-2xl mx-3`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Span>
    )
  }

  const ItemFlatTitle = () => {
    return (
      <Line className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Line>
    )
  }

  const ItemFlatKind = () => {

    return (
      <Span className={`mr-2`}>
        ( {item.expand.kind.slug} )
      </Span>
    )
  }
  const ItemFlatSummary = () => {
    return (
      <Line className={`text-black dark:text-slate-500 text-lg`}> 
        {item.summary}
      </Line>
    )
  }

  return (
    <li className={`h-full text-center md:text-left hover:prose-a:!no-underline`}>  
      
      <ItemFlatDate />
      <ItemFlatEmoji /> 
      <ItemFlatKind />
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemFlatTitle />

      </Link>
      <ItemFlatSummary />

    </li>
  )
}