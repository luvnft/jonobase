
/*
jonopoco
/app/(basis)/list/list-card.tsx
card for lists
*/

import Link from "next/link"
import { Span, Line } from "../../../../(basis)/util/tidy-html"
import { getFormattedDate, getFormattedDateTime, getFormattedYearMonth } from "../../../../(basis)/util/func"

export default function ItemCard({item, lang} : any) {

  let itemDate = ''
  switch (item.post_type) {
    case "links":
      itemDate = getFormattedDateTime(item.backdated)
      break;
    case "minis":
      itemDate = getFormattedDateTime(item.backdated, true)
      break;        
    case "notes":
      itemDate = getFormattedDate(item.backdated)
      break;
    case "pages":
      itemDate = getFormattedDate(item.backdated)
      break;
    case "works":
      itemDate = getFormattedYearMonth(item.backdated)
      break;
    default:
      itemDate = getFormattedDate(item.backdated)
    
  }  

  const ListCardWrapper = ({children}: any) => {
    return (
      <summary className={`
        block h-full py-2 px-5 
        border border-2 border-black dark:border-gray-600
        ${item.featured && 
          `bg-gradient-to-b from-yellow-200 to-yellow-300`
        }         
      `}>
        {children}
      </summary>
    )
  }

  const ListCardDate = () => {

    return (
      <Line className={`
        font-sans text-black dark:text-gray-500
        ${item.featured && `text-black dark:text-black`}
        ${item.collectionName === 'pages' && `hidden`}
        ${itemDate === '' && `hidden`}        
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}                 
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
      </Line> 
    )
  }

  const ListCardEmoji = () => {
    return (
      <Line
        className={`text-6xl`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Line>
    )
  }

  const ListCardTitle = () => {
    return (
      <h3 className={`
        hover:underline 
        ${item.emoji ? `text-2xl` : `text-6xl`}
      `}> 
        {item.title}
      </h3>
    )
  }

  const ListCardSummary = () => {
    return (
      <Line className={`text-black dark:text-slate-500 text-sm`}> 
        {item.summary}
      </Line>
    )
  }

  return (
    <li className={`h-full text-center`}>  

      <Link 
        href={`/en/${item.post_type}/${item.slug}`} 
        className={`
          hover:no-underline
          ${item.featured && `hover:!text-black dark:hover:!text-black`}
        `}
      >

        <ListCardWrapper featured={item.featured}>
          <ListCardDate />
          <ListCardEmoji />
          <ListCardTitle />
          <ListCardSummary />
        </ListCardWrapper> 

      </Link> 

    </li>          
  )
}