
/*
jonobase
/app/(basis)/item/item-card.tsx
"card" style of list item
*/

import Link from "next/link"
import { Span, Paragraph, SuperFlex, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate, getImageURL } from "@/app/(basis)/util/func"

export default function ItemCard({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)

  const ItemCardHead = ({children}: any) => {

    return (
      <SuperFlex 
        className={`item-card-head         
          text-gray-800 dark:text-gray-200 uppercase
        `}
        items={`end`}
      >
        {children}
      </SuperFlex>
    )

  }

  const ItemCardDate = () => {

    return (
      <div 
        className={`item-card-date 
          text-md md:text-xl
        `}
      >
        {item.featured && <FeaturedIcon ariaLabel={lang.featured} />}
        <Span>{itemDate}</Span>
      </div> 
    )
  }

  const ItemCardKind = () => {

    return (
      <div
        className={`item-card-kind           
          ${kind ? '' : 'hidden'}
        `}
      >
        {item.expand.kind.slug}
      </div>
    )

  }

  const ItemCardMain = ({children}: any) => {

    const bgImage = item.thumbnail 
      ? getImageURL(item.collectionId, item.id, item.thumbnail, '500x200') 
      : ''

    return (
      <div 
        className={`item-card-main 
          h-48 h-min-full 
          bg-zinc-100 dark:bg-gray-800 shadow-sm hover:shadow-xl bg-center bg-cover
          text-center flex justify-center items-center
        `}
        style={{
          backgroundImage: `url(${bgImage})`          
        }}
      >
        {children}
      </div>
    )
  }

  const ItemCardMeat = ({children}: any) => {

    return (
      <div 
        className={`item-card-meat 
          mx-5 lg:mx-auto my-5 px-5 py-2 
          ${item.thumbnail && `
            backdrop-opacity-70 bg-gray-900/90 max-w-fit
          `}        
        `}
      >
        {children}
      </div>
    )

  }

  const ItemCardIcon = () => {
    return (
      <div
        className={`item-card-icon
          text-6xl
        `}
      >
        <Span ariaHidden={true}>{item.emoji}</Span>
      </div>
    )
  }

  const ItemCardTitle = () => {
    return (
      <h3 
        className={`item-card-title text-xl md:text-3xl`}
      > 
        {item.title}
      </h3>
    )
  }

  const ItemCardTail = ({children}: any) => {
    return (
      <div 
        className={`item-card-tail 
          text-center 
        `}
      >{children}</div>
    )
  }

  const ItemCardSummary = () => {
    return (
      <div 
        className={`item-card-summary 
          mt-2 font-serif text-sm text-gray-800 dark:text-gray-200
        `}
      > 
        <Paragraph>{item.summary}</Paragraph>
      </div>
    )
  }

  return (
    <li className={`item-card 
      h-auto hover:prose-a:!no-underline 
      ${item.thumbnail && `hover:prose-a:!text-white dark:hover:prose-a:!text-white`}      
    `}>  

      <Link href={`/posts/${item.slug}`}>

        <ItemCardHead>

          <ItemCardDate />
          <ItemCardKind />

        </ItemCardHead>

        <ItemCardMain featured={item.featured}>
                        
          <ItemCardMeat>
            
            {!item.thumbnail && <ItemCardIcon />}
            <ItemCardTitle />

          </ItemCardMeat>

        </ItemCardMain> 

        <ItemCardTail>

          <ItemCardSummary />
        
        </ItemCardTail>

      </Link>

    </li>
  )
}