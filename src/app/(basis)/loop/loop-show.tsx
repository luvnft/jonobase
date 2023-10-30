

/*
jonopoco
/app/(basis)/loop/loop-show.tsx
loop wrapper for finds/kinds/lists etc
*/

import ItemCard from "../item/item-card"

export const LoopShow = ({lang, items}: any) => {
  return (
    <ul className={`grid gap-5 
      grid-cols-1 items-center place-content-center 
      ${items.length >= 2 && `sm:grid-cols-2`} 
      ${items.length >= 3 && `lg:grid-cols-3`}
    `}>
      { items && items.length > 0 
        ? items.map((item: any) => {
          return (
            <ItemCard 
              key={item.id} 
              lang={lang} 
              kind={''} 
              item={item}                   
            />
          )
        })
        : <li>{lang.no_items_yet}</li> 
      }
    </ul>
  )
}