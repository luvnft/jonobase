
/*
jonopoco
/app/[langs]/[type]/(post)/(libs)/post-main.tsx
main (body) for single "post" pages
with sanitized html 
*/

import { sanitize } from "isomorphic-dompurify"

export default async function PostMain({post}: any) {
  
  const content = sanitize(post.content, { ADD_ATTR: ['target']})
  
  return (        
    <article dangerouslySetInnerHTML={{__html: content}} />
  )
  
}