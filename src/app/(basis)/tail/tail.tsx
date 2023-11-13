
/* 
jonobase 
/app/(basis)/tail/tail.tsx 
essential component for the app's footer 
("tail" in my terminology) 
*/

import { sanitize } from 'isomorphic-dompurify'
import { getBase } from '@/app/(basis)/util/data'
import { getThemeLink, getTheme, getProse } from '../util/func'
import { ChildrenProps } from '../util/types'

interface TailProps {
  children: React.ReactNode | React.ReactNode[],
  className?: string
}

export default async function Tail() {

  const { app } = await getBase()

  const footerFat = app.footer_fat 
    ? sanitize(app.footer_fat, { ADD_ATTR: ['target']})
    : ''

  const footerCopy = app.footer_copyright 
    ? sanitize(app.footer_copyright, { ADD_ATTR: ['target']})
    : ''
  
  const footerLinks = app.footer_extra 
    ? sanitize(app.footer_extra, { ADD_ATTR: ['target']})
    : ''

  const TailFullWidthWrapper = ({children, className}: TailProps) => {
    return (
      <footer className={`tail-full-wrapper
        ${getThemeLink(app.theme)}
        ${getTheme()} ${getProse()}
        w-full bottom-0 
        bg-black 
        !font-sans text-white 
        prose-a:text-gray-600 hover:prose-a:text-white 
        prose-headings:!mt-0 mt-auto
        ${className} 
      `}>
        {children}
      </footer>
    )
  }

  const TailWrapper = ({children}: ChildrenProps) => {
    return (
      <section 
        className={`tail-wrapper 
          flex flex-col lg:flex-row 
          lg:justify-between lg:items-start 
          gap-2 lg:gap-10 
          max-w-screen-lg mx-auto py-5
        `}
      >
        {children}
      </section>
    )
  }

  const TailFat = () => {
    return (
      <>
        { footerFat &&
          <div 
            className={`tail-fat
              text-center w-full
            `}
            dangerouslySetInnerHTML={{__html: footerFat}}
          />
        }
      </>
    )
  }

  const TailCopy = () => {
    return (
      <div
        className={`tail-copy-wrapper 
          lg:w-1/2
        `}
      >
        { footerCopy &&
          <div 
            className={`tail-copy
              text-center lg:text-left
            `} 
            dangerouslySetInnerHTML={{__html: footerCopy}} 
          />
        }
      </div>
    )
  }

  const TailExtra = () => {
    return (
      <div 
        className={`tail-extra-wrapper
          lg:w-1/2
        `}
      >
      { footerLinks && 
        <div 
          className={`tail-extra
            text-center lg:text-right
          `} 
          dangerouslySetInnerHTML={{__html: footerLinks}}
        />
      }
      </div>
    )
  }
  
  return (

    <>
      { footerFat &&
        <TailFullWidthWrapper
          className={`
            bg-gradient-to-r from-gray-500 to-zinc-700 py-10
          `}>
          <TailWrapper>
            <TailFat />
          </TailWrapper>
        </TailFullWidthWrapper>
      }

      <TailFullWidthWrapper>
        <TailWrapper>
          <TailCopy />
          <TailExtra />
        </TailWrapper>
      </TailFullWidthWrapper>
    </>

  )
}