
/*
jonobase
/app/(basis)/util/func.tsx
loose helper functions to manipulate data
*/

export const getThemeLink = (theme: string) => {

  let linkTextColor = ''

  switch (theme) {
    case 'green': 
      linkTextColor = 'green-600'
      break
    case 'blue':
      linkTextColor = 'sky-500'
      break
    case 'red':
      linkTextColor = 'red-600'
      break
    case 'gray':
      linkTextColor = 'gray-400'
      break
    default:
      linkTextColor = 'sky-500'
  }

  const textColor = `prose-a:text-${linkTextColor}`

  return textColor

}

export const getBgColor = (theme: string) => {

  let bgColor = ''

  switch (theme) {
    case 'green': 
      bgColor = 'from-emerald-200 to-emerald-50 dark:from-emerald-800 to-emerald:700'
      break
    case 'blue':
      bgColor = 'from-sky-200 to-sky-50 dark:from-sky-800 dark:to-sky-700'
      break
    case 'red': 
      bgColor = 'from-red-300 to-red-50 dark:from-red-950 dark:to-red-800'
      break
    case 'gray':
      bgColor = 'from-zinc-300 to-zinc-100 dark:from-stone-800 dark:to-stone-700'
      break
    default:
      bgColor = 'from-sky-200 to-sky-100'
  }

  return bgColor

}

export const getTheme = () => {

  return (`
    hover:prose-a:text-black
    hover:prose-a:underline
    dark:hover:prose-a:text-white
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
    prose-blockquote:font-sans
    prose-blockquote:text-4xl
  `)
}

export const getImageURL = (
  collectionId: string,
  id: string,
  filename: string,
  size: string = ''
) => {
  return `${process.env.PBDOMAIN}/api/files/${collectionId}/${id}/${filename}${size ? `?thumb=${size}` : ``}`
}  

export const getFormattedDate = (
  oldDate: string,
  time: boolean = false
) => {
  // YYYY-MM-DD
  const ending = time ? 16 : 10
  return oldDate.substring(0, ending)
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