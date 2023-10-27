
/* 
jonopoco 
/app/(basis)/tail/tail.tsx 
essential component for the app's footer 
("tail" in my terminology) 
*/

import { sanitize } from 'isomorphic-dompurify'
import { getBase } from '@/app/(basis)/util/data'
import styles from './styles.module.css'

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

  const TailFullWidthWrapper = ({children}: any) => {
    return (
      <footer className={`${styles.footer} w-full 
        bg-black text-white py-5 bottom-0`}>
        {children}
      </footer>
    )
  }

  const TailWrapper = ({children}: any) => {
    return (
      <section 
        className={`flex flex-col  
          xl:flex-row xl:justify-between xl:items-start 
          gap-2 xl:gap-10
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
          <div className={`text-center xl:text-left w-full`} dangerouslySetInnerHTML={{__html: footerFat}} />
        }
      </>
    )
  }

  const TailCopy = () => {
    return (
      <div
        className={`xl:w-1/2`}
      >
        { footerCopy && 
          <div className={`text-center xl:text-left`} dangerouslySetInnerHTML={{__html: footerCopy}} />
        }
      </div>
    )
  }

  const TailExtra = () => {
    return (
      <div 
        className={`xl:w-1/2`}
      >
      { footerLinks && 
        <div className={`text-center xl:text-right`} dangerouslySetInnerHTML={{__html: footerLinks}} />
      }
      </div>  
    )
  }
  
  return ( 

    <TailFullWidthWrapper>
      <TailWrapper>
        <TailFat />
        <TailCopy />
        <TailExtra />       
      </TailWrapper>
    </TailFullWidthWrapper>

  )
}