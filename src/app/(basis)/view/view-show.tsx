/*
jonobase
/app/(basis)/view/view-show.tsx
loop wrapper for "take view" sections
*/

import { getProse } from "../util/func"
import { SectionDiv, SuperFlex } from "../util/tidy-html"
import { LoopShow } from "../loop/loop-show"
import { sanitize } from "isomorphic-dompurify"
import Link from "next/link"

export default async function ViewShow({lang, takeView}: any) {

  const { items, view } = takeView

  const messageBefore = view.message_before 
    ? sanitize(view.message_before, { ADD_ATTR: ['target']}) 
    : ''

  const messageAfter = view.message_before 
    ? sanitize(view.message_after, { ADD_ATTR: ['target']}) 
    : ''  

  return (
    <SectionDiv 
      key={view.id} 
      className={`
        py-10 drop-shadow-lg 
        bg-${view.bg_color}${view.bg_color_intensity ? `-${view.bg_color_intensity}` : ``} 
        text-${view.text_color}
        dark:bg-${view.bg_color}${view.bg_color_intensity ? `-900` : ``}
        dark:text-white
      `}>

      <h2 className={`text-4xl text-center md:text-left uppercase`}>{view.heading}</h2>

      {view.message_before && 
        <aside 
          className={`${getProse()} text-center md:text-left mt-5`} 
          dangerouslySetInnerHTML={{__html: messageBefore}} 
        />
      }

      {!view.hide_posts && 
        <LoopShow             
          kind={view.show_kind}
          lang={lang} 
          items={items} 
          type={view.type} 
        />
      }

      {view.message_after && 
        <aside 
          className={`${getProse()} text-center md:text-left mt-5`} 
          dangerouslySetInnerHTML={{__html: messageAfter}} 
        />
      }

      {view.cta_url && 
        <SuperFlex 
          className={`w-full`}
          justify="center"
          items="center"
          text="center"
        >        
          <Link 
            className={`button shadow-xl`}
            href={view.cta_url}
          >
            {view.cta_label ?? lang.view_more}
          </Link>          
        </SuperFlex>
      }
                    
    </SectionDiv>
  )


}