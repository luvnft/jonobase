
/*
jonobase
/app/(basis)/post/post-main.tsx
main (body) for single "post" pages
with sanitized html 
*/

'use client'
import { useEffect } from "react"
import { getProse } from "../util/func"
import Prism from './prism.js'
import './prism.css'

export const PostMain = ({post: { content } }: any) => {

  useEffect(() => {
    Prism.highlightAll(content)
  }, [content])
    
  return (  
    
    <article 
      className={getProse()}
      dangerouslySetInnerHTML={{ __html: content }} 
    />

  )
  
}