
/* 
jonopoco 
/app/(basis)/head/menu-find.tsx : 
essential site navigation
(search subcomponent)
*/

'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function MenuFind({lang, showMenu, ref}: any) {

  const [ searchTerm, setSearchTerm ] = useState('')
  const router = useRouter()

  const handleSubmit = (event: any) => {
    event.preventDefault() 
    router.push(`/search/${searchTerm}`)
    showMenu(false)
  }

  const handleSearchChange = (event: any) => {
    event.preventDefault()    
    setSearchTerm(event.target.value)
  }

  return (
    <div className={`flex justify-center`}>
      <form 
        className={`flex gap-5 w-full`}
        onSubmit={handleSubmit}
      >  
        <label htmlFor="query" className="sr-only">
          {lang.search}
        </label>
        <input 
          type="text" 
          name="query" 
          className={`border border-black text-black px-5 w-full`}
          placeholder={`🔎 ${lang.search}`}
          onChange={handleSearchChange}
          ref={ref}
        />
        <input 
          type="submit" 
          value={lang.go} 
          className={`bg-green-900 text-white cursor-pointer p-2 px-5`}                       
        />
      </form>
    </div>
  )

}

