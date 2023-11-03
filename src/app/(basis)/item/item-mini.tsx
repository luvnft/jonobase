
/*
jonobase
/app/(basis)/item/item-pico.tsx
an item link that contains just the title (and optional post "kind")
minimalism at its finest
*/

import Link from "next/link"
import { Span, Line } from "../util/tidy-html"
import { getFormattedDateTime } from "@/app/(basis)/util/func"

export default function ItemMini({item, kind = false, lang} : any) {

  let itemDate = getFormattedDateTime(item.created)

  const ItemMiniDate = () => {

    return (
      <Span className={`
        text-black dark:text-gray-500 mt-2
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
        ${item.collectionName === 'pages' ? `hidden` : ``}
        ${itemDate === '' ? `hidden` : ``}        
      `}>
        <ItemMiniFeatured />
        <Span>{itemDate}</Span>
      </Span> 
    )
  }

  const ItemMiniFeatured = () => {
    return (
      <>
        {item.featured && 
          <Span ariaLabel={lang.featured} className={`mr-2`}>📌</Span>
        } 
      </>
    )
  }

  const ItemMiniTitle = () => {
    return (            
      <Span className={`text-lg md:text-2xl lg:text-4xl`}>{item.title}</Span>      
    )
  }

  const ItemMiniKind = () => {
    return (      
      <Span>({item.expand.kind.slug})</Span>      
    )
  }

  return (
    <li className={`h-full text-center`}>  

      <Line>
        <ItemMiniDate />
        <br />
        <Link href={`/posts/${item.slug}`}>
          <ItemMiniTitle />
        </Link>        
        {kind && (
          <>
            <br />
            <ItemMiniKind />
          </>          
        )}
      </Line>
      

    </li>
  )
}