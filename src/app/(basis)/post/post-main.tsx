
/*
jonopoco
/app/(basis)/post/post-main.tsx
main (body) for single "post" pages
with sanitized html 
*/

'use client'

export const PostMain = ({post: { content } }: any) => {

  return (  
    
    <article       
      dangerouslySetInnerHTML={{ __html: content }} 
    />

  )
  
}