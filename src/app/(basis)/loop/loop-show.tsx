

/*
jonopoco
/app/(basis)/loop/loop-show.tsx
loop wrapper for finds/kinds/lists etc
*/

import ItemCard from "../item/item-card"
import ItemDrop from "../item/item-drop"
import ItemMini from "../item/item-mini"
import ItemNano from "../item/item-nano"
import ItemPico from "../item/item-pico"

export const LoopShow = ({kind = true, lang, items, type = 'nano'}: any) => {

  return (

    <>

      {(items && items.length > 0) &&       
      
        <ul className={`grid gap-5 
          grid-cols-1 items-center place-content-center my-5
          ${items.length >= 2 && `md:grid-cols-2`} 
          ${items.length >= 3 && `lg:grid-cols-3`}
        `}>
    
          {items.map((item: any) => {
            switch (type) {
              case "card":
                return (
                  <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "drop":
                return (
                  <ItemDrop key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "mini":
                return (
                  <ItemMini key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "nano":
                return (                  
                  <ItemNano key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "pico":
                return (
                  <ItemPico key={item.id} lang={lang} kind={kind} item={item} />
                )
              default:
                return (
                  <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
                )
            }
          })}        

        </ul>
        
      }

    </>

  )

}