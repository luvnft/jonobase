
/* 
jonobase 
/app/(basis)/head/menu.tsx : 
essential site navigation
*/

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { sanitize } from 'isomorphic-dompurify'
import FocusTrap from 'focus-trap-react'
import { Span } from '../util/tidy-html'
import MenuFind from './menu-find'
import { getThemeLink, getTheme, getProse } from '../util/func'
import { useHotkeys } from 'react-hotkeys-hook'

export default function Menu({app, lang} : any) {

  const [ showMenu, setShowMenu ] = useState(false)  
  const [ menuOpenedAlready, setMenuOpenedAlready ] = useState(false)  

  useHotkeys('ctrl+k, meta+k', () => document.getElementById('desktop-search-in-nav')?.focus())
  useHotkeys('ctrl+j, meta+j', () => document.getElementById('open-menu')?.click())
  useHotkeys('escape', () => closeMenu())

  /* def dark mode */
  const { theme, setTheme } = useTheme()

  const handleTheme = (event: any) => {
    event.preventDefault()
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  /* end dark mode */
  
  /* def menu ui */
  const openMenu = () => {
    setShowMenu(!showMenu) 
    setMenuOpenedAlready(true)   
  }

  const closeMenu = () => {
    setShowMenu(!showMenu)    
  }

  const menuContent = app.menu 
    ? sanitize(app.menu, { ADD_ATTR: ['target']})
    : ''

  const menuFooter = app.footer_extra 
    ? sanitize(app.footer_extra, { ADD_ATTR: ['target']})
    : ''  

  const richTextClasses = `${getThemeLink(app.theme)} ${getTheme()} ${getProse()}`

  useEffect(() => {
    if (menuOpenedAlready) document.getElementById('open-menu')?.focus()
  }, [showMenu, menuOpenedAlready])

  const MenuButton = () => {
    return (
      <div>
        <button className={`text-sm uppercase`} onClick={openMenu} id="open-menu">
          <Span className={`mr-1 text-2xl`} ariaHidden={true}>≡</Span>
          <Span className={`mx-1 text-2xl`}>{lang.menu}</Span>
          <Span className={`ml-1 text-gray-400 hidden sm:inline`}>(⌘J)</Span>
        </button>
      </div>
    )
  }

  const MenuDialog = ({children}: any) => {
    return (
      <dialog 
        aria-label={lang.menu} 
        className={`menu-dialog 
          bg-gradient-to-b from-zinc-100 to-zinc-200
          dark:from-black dark:to-gray-800
          flex z-20 overflow-y-auto 
          w-full h-screen fixed top-0 left-0 p-10
      `}>
        {children}
      </dialog>
    )
  }

  const MenuWrapper = ({children}: any) => {
    return (
      <div className={`menu-wrapper w-full lg:max-w-4xl mx-auto`}>
        {children}
      </div>
    )
  }

  const MenuHead = ({children}: any) => {
    return (
      <div className={`menu-head 
        flex flex-col sm:flex-row sm:justify-between items-center mb-10
      `}>
        {children}
      </div>
    )
  }

  const MenuHeading = () => {
    return (
      <div className={`menu-heading`}>
        <Span className={`text-3xl font-bold mr-2 uppercase`}>{app.title}</Span>
        <Span className={`text-xl font-light`}>{lang.menu}</Span>
      </div>
    )
  }

  const MenuTagline = () => {
    return (
      <div 
        className={`menu-tagline 
          block sm:hidden text-center my-2
        `}
      >
        <Span>{app.tagline}</Span>
      </div>
    )
  }

  const MenuOptions = ({children} : any) => {
    return (
      <div 
        className={`menu-options 
          flex justify-right gap-5
        `}
      >
        {children}
      </div>
    )
  }

  const MenuCloseOption = () => {
    return (
      <div 
        className={`menu-close 
          mt-5
        `}
      >
        <button onClick={closeMenu}>
          <Span 
            aria-hidden="true" 
            className={`mr-2`}>❌</Span> 
          <Span>{lang.close_menu}</Span>
        </button>
      </div>
    )
  }

  const MenuThemeOption = () => {
    return (
      <div 
        className={`menu-theme
          mt-5
        `}
      >
        <button onClick={handleTheme}>
          <Span 
            aria-hidden="true"
            className={`mr-2`}>
            {theme === 'dark' ? '💡' : '🌜' }
          </Span>
          <Span>
            {theme === 'dark' 
              ? lang.switch_to_light_mode 
              : lang.switch_to_dark_mode 
            }
          </Span>
        </button>
      </div>
    )
  }

  const MenuContent = () => {
    return (
      <nav
        className={`menu-content 
          ${richTextClasses} !font-sans my-5 text-4xl
        `} 
        dangerouslySetInnerHTML={{__html: menuContent}}
      />
    )
  }

  const MenuFooter = () => {
    return (
      <nav 
        className={`menu-footer 
          ${richTextClasses} !font-sans my-5 pb-10 text-center
        `} 
        dangerouslySetInnerHTML={{__html: menuFooter}}
      />
    )
  }

  const MenuFindWrapper = ({children, className}: any) => {
    return (
      <div 
        className={`menu-find-wrapper 
          ${className}
        `}
      >
        {children}
      </div>
    )
  }
  /* end menu ui */

  return (
    <>
      <MenuButton />
      <MenuFindWrapper className={`hidden md:block`}>
        <MenuFind lang={lang} showMenu={setShowMenu} inputName={`desktop-search-in-nav`} placeholder={`🔎 ${lang.search} (⌘K)`} />
      </MenuFindWrapper>
      { showMenu && (
        <FocusTrap>
          <div>
            <MenuDialog>
              <MenuWrapper>
                <MenuHead>
                  <MenuHeading />
                  <MenuTagline />
                  <MenuOptions>
                    <MenuCloseOption />
                    <MenuThemeOption />
                  </MenuOptions>
                </MenuHead>
                <MenuFindWrapper className={`block md:hidden`}>
                  <MenuFind lang={lang} showMenu={setShowMenu} inputName={`mobile-search-in-menu`} placeholder={`🔎 ${lang.search}`} />
                </MenuFindWrapper>
                <MenuContent />
                <MenuFindWrapper className={`hidden md:block`}>
                  <MenuFind lang={lang} showMenu={setShowMenu} inputName={`desktop-search-in-menu`} placeholder={`🔎 ${lang.search}`} />
                </MenuFindWrapper>
                { app.footer_extra && <MenuFooter /> }
              </MenuWrapper>
            </MenuDialog>
          </div>
        </FocusTrap>
      )}
    </>
  )
}