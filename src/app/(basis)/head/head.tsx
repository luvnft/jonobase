
/* 
jonopoco 
/app/(basis)/head/head.tsx 
essential component for the app's header 
*/

import Link from 'next/link'
import Image from 'next/image'
import { getImageURL } from '../util/func'
import Menu from './menu'
import { getBase } from '../util/data'

export default async function Head(_props: any) {

  const { app, lang } = await getBase()
  const icon = getImageURL(app.collectionId, app.id, app.icon)

  const HeadFullWidthWrapper = ({children}: any) => {
    return (
      <header 
        className={`z-10 w-full sticky top-0 
          bg-black bg-gradient-to-t from-black to-gray-700 
          text-white`
      }>
        {children}
      </header>
    )
  }

  const HeadWrapper = ({children}: any) => {
    return (
      <section 
        className={`flex justify-between 
          items-center gap-5`}>
        {children}
      </section>
    )
  }

  const HeadBranding = ({children}: any) => {
    return (
      <div className={`flex flex-row 
        items-center gap-5`}>
        {children}
      </div>
    )
  }

  const HeadBrandLink = ({children}: any) => {
    return (
      <Link 
        className={`flex flex-row 
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
        className={`min-w-10 max-h-10 
          rounded-full border-2 border-white drop-shadow`}
        src={icon} alt="" height={40} width={40} 
      /> 
    )
  }

  const HeadBrandTitle = () => {
    return (
      <h1 className={`text-3xl uppercase`}>
        {app.title}
      </h1>
    )
  }

  const HeadBrandTagline = () => {
    return (
      <p className={`hidden md:block`}>
        {app.tagline}
      </p>
    )
  }

  const HeadMenuWrapper = ({children}: any) => {
    return (
      <div className={`whitespace-nowrap flex flex-row gap-5`}>
        {children}
      </div>
    )
  }

  return ( 

    <HeadFullWidthWrapper>
      <HeadWrapper>
        <HeadBranding>
          <HeadBrandLink>
            {app.icon && <HeadBrandLogo />}
            <HeadBrandTitle />
          </HeadBrandLink>
          { app.tagline && <HeadBrandTagline />}
        </HeadBranding>      
        <HeadMenuWrapper>
          <Menu app={app} lang={lang} />
        </HeadMenuWrapper>        
      </HeadWrapper>
    </HeadFullWidthWrapper>
  
  )
  
}