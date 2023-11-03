
/*
jonobase
/app/(basis)/post/post-main.tsx
main (body) for single "post" pages
with sanitized html 
*/

'use client'

import { getProse } from "../util/func"

export const PostMain = ({post: { content } }: any) => {

  return (  
    
    <article className={getProse()}
      dangerouslySetInnerHTML={{ __html: content }} 
    />

  )
  
}