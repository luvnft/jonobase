
/*
jonobase
/app/(basis)/item/item-card.tsx
"card" style of item card, showing:
- "kind" optionally indicated
- date
- emoji (optional)
- title
- summary
*/

import Link from "next/link"
import { Span, Paragraph } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate, getImageURL } from "@/app/(basis)/util/func"

export default function ItemCard({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)     

  const ListCardWrapper = ({children}: any) => {  

    const bgImage = getImageURL(item.collectionId, item.id, item.thumbnail)

    return (
      <div 
        className={`
          block h-full shadow-sm hover:shadow-xl 
          border border-2 border-black dark:border-gray-600 
          bg-zinc-100 dark:bg-black 
        `}  
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover'
        }}     
      >
        {children}
      </div>
    )
  }

  const ListPostKind = () => {    

    
    return (
      <Paragraph className={`
        text-white dark:text-white uppercase 
        mt-0 bg-gradient-to-b 
        from-black to-gray-700         
        ${kind ? '' : 'hidden'}
      `}>
        {item.expand.kind.slug}
      </Paragraph>
    )
  }

  const ListCardInner = ({children}: any) => {

    return (
      <div className={`
        mx-5 lg:mx-auto my-5 p-5 
        ${item.thumbnail && `backdrop-opacity-90 backdrop-invert bg-gray-900/70 max-w-fit`}        
      `}>
        {children}
      </div>
    )

  }

  const ListCardDate = () => {

    return (
      <Span className={`
         text-black dark:text-gray-500 mt-5
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
        ${item.thumbnail ? `text-white dark:text-yellow-500` : ``}
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

  const ListCardEmoji = () => {
    return (
      <Paragraph
        className={`text-6xl`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Paragraph>
    )
  }

  const ListCardTitle = () => {
    return (
      <h3 className={`
        hover:underline 
        ${item.emoji ? `text-3xl` : `text-4xl`}        
        ${item.thumbnail ? `hover:text-gray-200` : ``}
      `}> 
        {item.title}
      </h3>
    )
  }

  const ListCardSummary = () => {
    return (
      <Span className={`
        font-serif text-black dark:text-slate-500 text-lg
        ${item.thumbnail ? `text-white dark:text-slate-500` : ``}
      `}> 
        {item.summary}
      </Span>
    )
  }

  return (
    <li className={`h-full text-center hover:prose-a:!no-underline`}>  

      <Link 
        href={`/posts/${item.slug}`} 
        className={`
          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <ListCardWrapper featured={item.featured}>
          
          <ListPostKind />
          
          <ListCardInner>
            <ListCardDate />
            {!item.thumbnail && <ListCardEmoji />}
            <ListCardTitle />
            <ListCardSummary />
          </ListCardInner>

        </ListCardWrapper> 

      </Link>

    </li>
  )
}