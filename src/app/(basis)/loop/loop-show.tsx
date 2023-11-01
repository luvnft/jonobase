

/*
jonopoco
/app/(basis)/loop/loop-show.tsx
loop wrapper for finds/kinds/lists etc
*/

import ItemCard from "../item/item-card"
import ItemDrop from "../item/item-drop"

export const LoopShow = ({kind = true, lang, items, type = 'card'}: any) => {
  return (
    <ul className={`grid gap-5 
      grid-cols-1 items-center place-content-center 
      ${items.length >= 2 && `sm:grid-cols-2`} 
      ${items.length >= 3 && `lg:grid-cols-3`}
    `}>
      { items && items.length > 0 
        ? items.map((item: any) => {
          switch (type) {
            case "card":
              return (
                <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
              )
            case "drop":
              return (
                <ItemDrop key={item.id} lang={lang} kind={kind} item={item} />
              )
            default:
              return (
                <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
              )
          }
        })
        : <li>{lang.no_items_yet}</li> 
      }
    </ul>
  )
}

