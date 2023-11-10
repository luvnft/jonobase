
/*
jonobase
/app/(basis)/item/item-pico.tsx
an item link that contains just the title (and optional post "kind")
minimalism at its finest
*/

import Link from "next/link"
import { Span, Paragraph } from "../util/tidy-html"

export default function ItemNull({item, kind = false, lang} : any) {

  const ItemNullFeatured = () => {
    return (
      <>
        {item.featured && 
          <Span ariaLabel={lang.featured} className={`mr-2`}>📌</Span>
        } 
      </>
    )
  }

  const ItemNullTitle = () => {
    return (            
      <Span className={`text-xl sm:text-2xl lg:text-3xl`}>{item.title}</Span>      
    )
  }

  const ItemNullKind = () => {
    return (
      <Span>({item.expand.kind.slug})</Span>
    )
  }

  return (
    <li className={`h-full text-center`}>  

      <Paragraph>
        <ItemNullFeatured />
        <Link href={`/posts/${item.slug}`}>
          <ItemNullTitle />
        </Link>
        <br />
        {kind && <ItemNullKind />}
      </Paragraph>
      

    </li>
  )
}