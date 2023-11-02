
/*
jonopoco
/app/(basis)/item/item-pico.tsx
an item link that contains just the title (and optional post "kind")
minimalism at its finest
*/

import Link from "next/link"
import { Span, Line } from "../util/tidy-html"

export default function ItemPico({item, kind = false, lang} : any) {

  const ItemPicoFeatured = () => {
    return (
      <>
        {item.featured && 
          <Span ariaLabel={lang.featured} className={`mr-2`}>📌</Span>
        } 
      </>
    )
  }

  const ItemPicoTitle = () => {
    return (            
      <Span className={`text-xl sm:text-2xl lg:text-3xl`}>{item.title}</Span>      
    )
  }

  const ItemPicoKind = () => {
    return (
      <>
        <Span>({item.expand.kind.slug})</Span>
      </>
    )
  }

  return (
    <li className={`h-full text-center`}>  

      <Line>
        <ItemPicoFeatured />
        <Link href={`/posts/${item.slug}`}>
          <ItemPicoTitle />
        </Link>
        {kind && <ItemPicoKind />}
      </Line>

    </li>
  )
}