

/*
jonobase
/app/(basis)/loop/loop-show.tsx
loop wrapper for finds/kinds/lists etc
*/

import ItemCard from "../item/item-card"
import ItemDrop from "../item/item-drop"
import ItemFlat from "../item/item-flat"
import ItemLite from "../item/item-lite"
import ItemMini from "../item/item-mini"
import ItemNull from "../item/item-null"

export const LoopShow = ({lang, items, view = null}: any) => {

  let trio = false
  let gap = 'gap-10'

  switch (view.type) {    
    case "mini":
    case "null": 
      gap = 'gap-0 sm:gap-5'      
      break
    default:
      trio = true      
  }

  return (

    <>

      {(items && items.length > 0) &&       
      
        <ul className={`loop-list
          w-max max-w-full sm:w-auto mx-auto 
          items-start py-10
          grid ${gap} grid-cols-1 
          ${items.length >= 2 && `sm:grid-cols-2`} 
          ${(items.length >= 3 && trio) && `xl:grid-cols-3`}
        `}>
    
          {items.map((item: any) => {
            switch (view.type) {
              case "card":
                return (
                  <ItemCard key={item.id} item={item} lang={lang} view={view} />
                )
              case "drop":
                return (
                  <ItemDrop key={item.id} item={item} lang={lang} view={view} />
                )
              case "flat":
                return (
                  <ItemFlat key={item.id} item={item} lang={lang} view={view} />
                )
              case "lite":
                return (                  
                  <ItemLite key={item.id} item={item} lang={lang} view={view} />
                )
              case "mini":
                return (
                  <ItemMini key={item.id} item={item} lang={lang} view={view} />
                )
              default:
                return (
                  <ItemNull key={item.id} item={item} lang={lang} view={view} />
                )
            }
          })}        

        </ul>
        
      }

    </>

  )

}