
/*
jonobase
/app/(basis)/item/item-drop.tsx
"drop" style of list item
- entire item as a link
- icon as thumbnail or emoji
- meat
  - date 
  - title
  - summary
*/

import Link from "next/link"
import { Span, Paragraph, SuperFlex, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate, getImageURL } from "@/app/(basis)/util/func"

export default function ItemDrop({item, lang, view} : any) {

  let itemDate = getFormattedDate(item.created, view.show_time)

  const ItemDropMain = ({children}: any) => {
    return (
      <SuperFlex 
        className={`item-drop-main`}
        justify="start" 
        items="start"
      >
        {children}
      </SuperFlex>
    )    
  }

  const ItemDropIcon = () => {

    const bgImage = item.thumbnail 
      ? getImageURL(item.collectionId, item.id, item.thumbnail, '100x100')
      : ''    

    const icon = item.thumbnail 
      ? '' 
      : (item.emoji 
        ? item.emoji 
        : `🤷🏻‍♂️`)

    return (
      <div
        className={`item-drop-icon 
          border bg-white rounded-full min-h-[100px] min-w-[100px] shadow-sm shadow-gray-500
          p-5 text-5xl text-center`} 
        aria-label="hidden"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        {icon}
      </div>
    )
  }

  const ItemDropMeat = ({children}: any) => {
    return (
      <div 
        className={`item-drop-meat 
          mx-5
        `}
      >
        {children}
      </div>
    )
  }


  const ItemDropDate = () => {
    return (
      <Span 
        className={`item-drop-date 
          text-black dark:text-gray-500
          ${item.featured ? `text-black dark:text-yellow-500` : ``}
        `}
      >
        {item.featured && <FeaturedIcon />}
        <Span className="text-md md:text-xl mr-1">{itemDate}</Span>        
      </Span> 
    )
  }

  const ItemDropKind = () => {
    return (
      <Span 
        className={`item-drop-kind 
          text-black dark:text-white
        `}
      > ({item.expand.kind.slug}) </Span>
    )
  }

  const ItemDropTitle = () => {
    return (
      <h3 
        className={`item-drop-title 
          hover:underline text-xl md:text-2xl
        `}
      > 
        {item.title}
      </h3>
    )
  }

  const ItemDropSummary = () => {
    return (
      <Paragraph 
        className={`item-drop-summary 
          font-serif text-black dark:text-slate-300 text-sm
        `}
      > 
        {item.summary}
      </Paragraph>
    )
  }

  const ItemDropLink = () => {

    const target = item.url_newtab ? '_blank' : ''

    return (
      <div className="flex gap-2 whitespace-nowrap">     
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
    <li 
      className={`item-drop
        h-full w-max max-w-full sm:w-full
        text-left hover:prose-a:!no-underline 
      `}
    >

      <Link 
        href={`/posts/${item.slug}`} 
        className={`          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <ItemDropMain>
          
          <ItemDropIcon />
                    
          <ItemDropMeat>
            {view.show_date ? <ItemDropDate /> : ''}
            {view.show_kind && <ItemDropKind />}
            <ItemDropTitle />
            <ItemDropSummary />
            {item.url && <ItemDropLink />}
          </ItemDropMeat>          

        </ItemDropMain>
        
      </Link>

    </li>
  )
}