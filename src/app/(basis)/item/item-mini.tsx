
/*
jonobase
/app/(basis)/item/item-mini.tsx
"mini" style of list item
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export default function ItemMini({item} : any) {  

  const ItemMiniEmoji = () => {
    return (
      <Span
        className={`text-2xl mr-1`} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemMiniTitle = () => {
    return (
      <Span className={`
        hover:underline text-2xl
      `}> 
        {item.title}
      </Span>
    )
  }

  return (
    <li className={`h-full text-left hover:prose-a:!no-underline`}>  
      
      <ItemMiniEmoji />      
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemMiniTitle />
      </Link>

    </li>
  )
}