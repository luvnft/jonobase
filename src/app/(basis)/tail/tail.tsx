
/* 
jonopoco 
/app/(basis)/tail/tail.tsx 
essential component for the app's footer 
("tail" in my terminology) 
*/

import { sanitize } from 'isomorphic-dompurify'
import { getBase } from '@/app/(basis)/util/data'
import { getTheme, getProse } from '../util/func'

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

  const TailFullWidthWrapper = ({children, className}: any) => {
    return (
      <footer className={`${getProse()} ${getTheme('green')} w-full bottom-0 mt-auto 
        !font-sans 
        bg-black ${className} 
        text-white prose-a:text-gray-600 hover:prose-a:text-white
        prose-headings:!mt-0 
      `}>
        {children}
      </footer>
    )
  }

  const TailWrapper = ({children}: any) => {
    return (
      <section 
        className={`flex flex-col  
          lg:flex-row lg:justify-between lg:items-start 
          gap-2 lg:gap-10 py-5 max-w-screen-lg mx-auto
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
            className={`text-center w-full`} 
            dangerouslySetInnerHTML={{__html: footerFat}} 
          />
        }
      </>
    )
  }

  const TailCopy = () => {
    return (
      <div
        className={`lg:w-1/2`}
      >
        { footerCopy && 
          <div 
            className={`text-center lg:text-left`} 
            dangerouslySetInnerHTML={{__html: footerCopy}} 
          />
        }
      </div>
    )
  }

  const TailExtra = () => {
    return (
      <div 
        className={`lg:w-1/2`}
      >
      { footerLinks && 
        <div className={`text-center lg:text-right`} dangerouslySetInnerHTML={{__html: footerLinks}} />
      }
      </div>  
    )
  }
  
  return ( 

    <>
    
      { footerFat && 
        <TailFullWidthWrapper className={`bg-gradient-to-r from-gray-500 to-zinc-700 py-10`}>      
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