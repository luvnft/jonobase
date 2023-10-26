
/*
jonopoco
/app/basis/util/func.tsx
loose helper functions to manipulate data
*/

export const getImageURL = (collectionId: string, id: string, icon: string) => {
  return `${process.env.PBDOMAIN}/api/files/${collectionId}/${id}/${icon}`
}  

export const getFormattedDate = (oldDate: any) => {
  return oldDate.substring(0, 10)
}

export const getFormattedDateTime = (oldDate: any, seconds: boolean = false) => {
  const ending = seconds ? 19 : 16
  return oldDate.substring(0, ending)
}

export const getFormattedYearMonth = (oldDate: any) => {
  return oldDate.substring(0, 7)
}

export const getFormattedTime = (oldDate: any, seconds: boolean = false) => {
  const ending = seconds ? 19 : 16
  return oldDate.substring(11, ending)
}
