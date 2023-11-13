
/* 
jonobase 
/app/(basis)/head/menu-find.tsx : 
essential site navigation
(search subcomponent)
*/

'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

interface MenuFindProps {
  lang: { [x: string]: string },
  showMenu?: (arg: boolean) => void,
  inputName: string,
  placeholder: string,
}

export default function MenuFind({lang, showMenu, inputName, placeholder = '🔎'}: MenuFindProps) {

  const [ searchTerm, setSearchTerm ] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    router.push(`/finds/${decodeURIComponent(searchTerm)}`)
    showMenu && showMenu(false)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  return (
    <div className={`flex justify-center `}>
      <form 
        className={`flex gap-5 w-full`}
        onSubmit={handleSubmit}
      >  
        <label htmlFor={inputName} className="sr-only">
          {lang.search}
        </label>
        <input 
          type="text"
          name={inputName}
          id={inputName}
          className={`px-5 w-full border
            border-black dark:bg-black
            border-gray-800 dark:border-gray-600
            text-black dark:text-white`}
          placeholder={placeholder}
          onChange={handleSearchChange}
        />
        <input 
          type="submit"
          value={lang.go}
          className={`
            bg-green-900 border border-gray-200 dark:border-gray-500 
            text-white cursor-pointer p-2 px-5
          `}
        />
      </form>
    </div>
  )

}

