
/*
jonopoco
/app/(basis)/item/item-drop.tsx
a post "drop" for lists but not limited to lists
*/

import Link from "next/link"
import { Span, Line, StartFlex } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemCard({lang, kind = false, item} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ItemDropInner = ({children}: any) => {

    return (
      <div className={`mx-5`}>
        {children}
      </div>
    )

  }

  const ItemDropEmoji = () => {
    return (
      <div
        className={`text-6xl border-2 rounded-full p-5 drop-shadow-xl`} 
        aria-label="hidden"        
      >
        {item.emoji}
      </div>
    )
  }

  const ItemDropDate = () => {

    return (
      <Span className={`
        text-black dark:text-gray-500 mt-2
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
        ${item.collectionName === 'pages' ? `hidden` : ``}
        ${itemDate === `` ? `hidden` : ``}
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
        { kind && <ItemDropKind />}
      </Span> 
    )
  }

  const ItemDropKind = () => {
    return (
      <Span> ({item.expand.kind.slug}) </Span>
    )
  }

  const ItemDropTitle = () => {
    return (
      <h3 className={`hover:underline text-3xl`}> 
        {item.title}
      </h3>
    )
  }

  const ItemDropSummary = () => {
    return (
      <Line className={`text-black dark:text-slate-500 text-sm`}> 
        {item.summary}
      </Line>
    )
  }

  return (
    <li className={`h-full text-left hover:prose-a:!no-underline`}>

      <Link 
        href={`/posts/${item.slug}`} 
        className={`
          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <StartFlex>
          
          {item.emoji && <ItemDropEmoji />}
          
          <ItemDropInner>
            <ItemDropDate />                      
            <ItemDropTitle />
            <ItemDropSummary />          
          </ItemDropInner>

        </StartFlex>

      </Link>

    </li>
  )
}