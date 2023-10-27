
/*
jonopoco
/app/(basis)/meat/meat-main.tsx
main (body) for single "meat" pages
with sanitized html 
*/

import { sanitize } from "isomorphic-dompurify"

export default async function MeatMain({post}: any) {
  
  const content = sanitize(post.content, { ADD_ATTR: ['target']})
  
  return (        
    <article dangerouslySetInnerHTML={{__html: content}} />
  )
  
}