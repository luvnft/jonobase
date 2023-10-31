
/* 
jonopoco 
/app/(basis)/head/menu-find.tsx : 
essential site navigation
(search subcomponent)
*/

'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function MenuFind({lang, showMenu, inputName, className = ''}: any) {

  const [ searchTerm, setSearchTerm ] = useState('')
  const router = useRouter()

  const handleSubmit = (event: any) => {
    event.preventDefault() 
    router.push(`/finds/${decodeURIComponent(searchTerm)}`)
    showMenu && showMenu(false)
  }

  const handleSearchChange = (event: any) => {
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
          placeholder={`🔎 ${lang.search}`}
          onChange={handleSearchChange}          
        />
        <input 
          type="submit" 
          value={lang.go} 
          className={`bg-green-900 border border-gray-200 dark:border-gray-500 text-white cursor-pointer p-2 px-5`}                       
        />
      </form>
    </div>
  )

}

