
/* 
jonobase 
/app/(basis)/head/head.tsx 
essential component for the app's header 
*/

import Link from 'next/link'
import Image from 'next/image'
import { getImageURL } from '../util/func'
import Skip from '../a11y/skip'
import Menu from './menu'
import { getBase } from '../util/data'
import { ChildrenProps } from '../util/types'

export default async function Head() {

  const { app, lang } = await getBase()
  const icon = getImageURL(app.collectionId, app.id, app.icon)

  const HeadFullWidthWrapper = ({children}: ChildrenProps) => {
    return (
      <header 
        className={`head-fullwidth-wrapper
          w-full sticky top-0 z-40
          bg-black bg-gradient-to-t from-black to-gray-700 
          text-white drop-shadow-xl`
      }>
        {children}
      </header>
    )
  }

  const HeadWrapper = ({children}: ChildrenProps) => {
    return (
      <section 
        className={`head-wrapper
          flex justify-between 
          items-center my-2 sm:my-5 gap-5 max-w-screen-lg mx-auto`}>
        {children}
      </section>
    )
  }

  const HeadBrand = ({children}: ChildrenProps) => {
    return (
      <div className={`head-brand
        flex flex-row 
        items-center gap-5`}>
        {children}
      </div>
    )
  }

  const HeadBrandLink = ({children}: ChildrenProps) => {

    return (
      <Link 
        className={`head-brand-link
          flex flex-row 
          items-center gap-5`}
        href={`/`}
      >
        {children}
      </Link>
    )
  }

  const HeadBrandLogo = () => {
    return (
      <Image 
        className={`head-brand-logo 
          min-w-10 max-h-10 
          rounded-full border-2 border-white drop-shadow`}
        src={icon} 
        alt="" 
        height={40} 
        width={40} 
      /> 
    )
  }

  const HeadBrandTitle = () => {
    return (
      <h1 
        className={`head-brand-title 
          text-2xl sm:text-3xl uppercase
        `}
      >
        {app.title}
      </h1>
    )
  }

  const HeadBrandTagline = () => {
    return (
      <div
        className={`head-brand-tagline
          hidden sm:block
        `}
      >
        {app.tagline}
      </div>
    )
  }

  const HeadMenuWrapper = ({children}: ChildrenProps) => {
    return (
      <div 
        className={`head-menu-wrapper
          whitespace-nowrap 
          flex flex-row gap-5 items-center
        `}
      >
        {children}
      </div>
    )
  }

  return ( 

    <HeadFullWidthWrapper>
      <Skip text={lang.skip_to_main_content} />
      <HeadWrapper>
        <HeadBrand>
          <HeadBrandLink>
            {app.icon && <HeadBrandLogo />}
            <HeadBrandTitle />
          </HeadBrandLink>
          { app.tagline && <HeadBrandTagline />}
        </HeadBrand>      
        <HeadMenuWrapper>
          <Menu app={app} lang={lang} />
        </HeadMenuWrapper>        
      </HeadWrapper>
    </HeadFullWidthWrapper>
  
  )
  
}