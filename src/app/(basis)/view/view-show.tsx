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
import { RecordModel } from "pocketbase"

interface ViewShowProps {
  lang: { [x: string]: string},
  takeView: {
    view: any,
    items: RecordModel[]
  } 
}

export default async function ViewShow({lang, takeView}: ViewShowProps) {

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
      className={`view-section 
        py-10 drop-shadow-lg 
        bg-${view.bg_color}${view.bg_color_intensity ? `-${view.bg_color_intensity}` : ``} 
        text-${view.text_color}
        dark:bg-${view.bg_color}${view.bg_color_intensity ? `-800` : ``}
        dark:text-white
      `}
    >

      <h2 
        className={`view-section-heading
          text-4xl text-center sm:text-left uppercase
        `}
      >
        {view.heading}
      </h2>

      {view.message_before && 
        <aside 
          className={`view-section-premsg 
            ${getProse()} text-center sm:text-left mt-5
          `}
          dangerouslySetInnerHTML={{__html: messageBefore}} 
        />
      }

      {!view.hide_posts && 
        <LoopShow
          lang={lang} 
          items={items} 
          view={view}
        />
      }

      {view.message_after && 
        <aside 
          className={`view-section-postmsg
            ${getProse()} text-center sm:text-left mt-5
          `} 
          dangerouslySetInnerHTML={{__html: messageAfter}}
        />
      }

      {view.cta_url &&
        <SuperFlex
          className={`view-section-cta
            w-full
          `}
          justify="center"
          items="center"
          text="center"
        >
          <Link
            className={`view-section-cta-button button shadow-sm`}
            href={view.cta_url}
          >
            {view.cta_label ?? lang.view_more}
          </Link>
        </SuperFlex>
      }

    </SectionDiv>
  )


}