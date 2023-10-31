
/*
jonopoco
/app/(basis)/util/func.tsx
loose helper functions to manipulate data
*/

export const getTheme = (theme: string) => {

  let colors = { linkText: '' }

  switch (theme) {
    case 'green': 
      colors = { 
        linkText: 'green-600' 
      }
      break
    case 'blue':
      colors = { 
        linkText: 'sky-500' 
      }
      break
    case 'red': 
      colors = { 
        linkText: 'red-600'
      }
      break
    default:
      colors = { 
        linkText: 'sky-500' 
      }
  }

  return (`
    prose-a:text-${colors.linkText}
    hover:prose-a:text-black 
    hover:prose-a:underline 
    dark:hover:prose-a:text-white 
    dark:hover:prose-a:underline 
    prose-table:w-full     
    prose-table:border 
    prose-table:border-black 
    dark:prose-table:border-white
    prose-th:bg-black 
    dark:prose-th:bg-white    
    prose-th:text-white  
    dark:prose-th:text-black
    prose-th:text-left
    prose-th:px-5
    prose-th:py-2
    prose-td:border 
    prose-td:border-black 
    prose-td:px-5
    prose-td:py-2    
    prose-td:align-top    
  `)
}

export const getProse = () => {
  return (`
    font-serif           
    prose-table:table-auto
    prose-headings:font-sans    
    prose-headings:my-5      
    prose-h2:text-5xl      
    prose-h3:text-4xl        
    prose-h4:text-3xl    
    prose-h5:text-2xl    
    prose-h6:text-lg
    prose-ul:m-4
    prose-ul:list-disc      
    prose-ol:m-4
    prose-ol:list-decimal      
    prose-li:m-4   
    prose-p:my-5
  `)
}

export const getImageURL = (
  collectionId: string, 
  id: string, 
  icon: string
) => {
  return `${process.env.PBDOMAIN}/api/files/${collectionId}/${id}/${icon}`
}  

export const getFormattedDate = (
  oldDate: string
) => {
  // YYYY-MM-DD
  return oldDate.substring(0, 10)
}

export const getFormattedDateTime = (
  oldDate: string, 
  seconds: boolean = false
) => {
  // YYYY-MM-DD hh:mm(:ss)
  const ending = seconds ? 19 : 16
  return oldDate.substring(0, ending)
}

export const getFormattedYearMonth = (
  oldDate: string
) => {
  // YYYY-MM
  return oldDate.substring(0, 7)
}

export const getFormattedTime = (
  oldDate: string, 
  seconds: boolean = false
) => {
  // hh:mm or hh:mm:ss
  const ending = seconds ? 19 : 16
  return oldDate.substring(11, ending)
}