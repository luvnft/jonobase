
/*
jonopoco
/app/basis/util/func.tsx
loose helper functions to manipulate data
*/

export const getImageURL = ({collectionId, id, icon}: any) => {
  return `${process.env.PBDOMAIN}/api/files/${collectionId}/${id}/${icon}`
}  

export const getFormattedDate = (oldDate: any) => {
  return oldDate.substring(0, 10)
}

export const getFormattedDateTime = (oldDate: any, seconds: boolean = false) => {
  const ending = seconds ? 19 : 16
  return oldDate.substring(0, ending)
}

export const getFormattedTime = (oldDate: any, seconds: boolean = false) => {
  const ending = seconds ? 19 : 16
  return oldDate.substring(11, ending)
}
