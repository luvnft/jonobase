
/*
jonopoco
/app/(basis)/util/func.tsx
loose helper functions to manipulate data
*/

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
