
/*
jonobase
/app/(basis)/item/item-drop.tsx
"drop" style of list item
*/

import Link from "next/link"
import { Span, Paragraph, SuperFlex, FeaturedIcon } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate, getImageURL } from "@/app/(basis)/util/func"

export default function ItemDrop({lang, kind = false, item} : any) {

  let itemDate = getFormattedDate(item.created)

  const ItemDropMain = ({children}: any) => {
    return (
      <SuperFlex justify="start" items="start">
        {children}
      </SuperFlex>
    )    
  }

  const ItemDropMeat = ({children}: any) => {
    return (
      <div className={`mx-5`}>
        {children}
      </div>
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
        className={`
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

  const ItemDropDate = () => {

    return (
      <Span className={`
        text-black dark:text-gray-500
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
      `}>
        {item.featured && <FeaturedIcon />}
        <Span className="text-2xl mr-1">{itemDate}</Span>
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
      <Paragraph className={`font-serif text-black dark:text-slate-300 text-sm`}> 
        {item.summary}
      </Paragraph>
    )
  }

  return (
    <li className={`item-drop
      h-full w-max max-w-full md:w-full
      text-left hover:prose-a:!no-underline 
    `}>

      <Link 
        href={`/posts/${item.slug}`} 
        className={`          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <ItemDropMain>
          
          <ItemDropIcon />
                    
          <ItemDropMeat>
            <ItemDropDate />
            <ItemDropTitle />
            <ItemDropSummary />
          </ItemDropMeat>

        </ItemDropMain>

      </Link>

    </li>
  )
}