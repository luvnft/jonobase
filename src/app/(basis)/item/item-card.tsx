
/*
jonobase
/app/(basis)/item/item-card.tsx
"card" style of list item
(the most complex list item type!)
- card head (non-link)
  - date
  - kind (if specified by editor in database)
- card main (entirety as link)
  - meat (background as thumbnail or...)
    - icon (if no thumbnail)
    - title 
- card tail (non-link)
  - summary

*/

import Link from "next/link"
import { Span, Paragraph, SuperFlex, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate, getImageURL } from "@/app/(basis)/util/func"

export default function ItemCard({lang, item, view} : any) {

  let itemDate = getFormattedDate(item.created, view.show_time)

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
          bg-zinc-100 dark:bg-gray-800 bg-center bg-cover
          text-center flex justify-center items-center
          shadow-sm hover:shadow-xl 
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
        <Span ariaHidden={true}>
          {item.emoji}
        </Span>
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
      <SuperFlex         
        className={`item-card-tail 
          text-center mt-2 gap-5
        `}
        text="center"
        items="start"
      >{children}</SuperFlex>
    )
  }

  const ItemCardSummary = () => {
    return (
      <div 
        className={`item-card-summary 
          mt-2 font-serif text-sm text-gray-800 dark:text-gray-200 
          text-left
        `}
      > 
        <Paragraph>{item.summary}</Paragraph>
      </div>
    )
  }

  const ItemCardLink = () => {

    const target = item.url_newtab ? '_blank' : ''

    return (
      <div className="flex gap-2 whitespace-nowrap">
        <Link href={`/posts/${item.slug}`}>
          <div
            className={`item-card-link
              button
            `}
          >
            {lang.view_more}
          </div>
        </Link>      
        <Link href={item.url} target={target}>
          <div
            className={`item-card-link
              button
            `}
          >
            {lang.visit_link}
          </div>
        </Link>      
      </div>
    )

  }

  return (
    <li className={`item-card 
      h-auto hover:prose-a:!no-underline text-center
      ${item.thumbnail && `hover:prose-a:!text-white dark:hover:prose-a:!text-white`}
    `}>  

      <Link href={`/posts/${item.slug}`}>

        <ItemCardHead>

          {view.show_date && <ItemCardDate />}
          {view.show_kind && <ItemCardKind />}

        </ItemCardHead>

        <ItemCardMain featured={item.featured}>

          <ItemCardMeat>
            
            {!item.thumbnail && <ItemCardIcon />}
            <ItemCardTitle />

          </ItemCardMeat>

        </ItemCardMain> 

      </Link>

      <ItemCardTail>

        <ItemCardSummary />
        {item.url && <ItemCardLink />}
      
      </ItemCardTail>

    </li>
  )
}