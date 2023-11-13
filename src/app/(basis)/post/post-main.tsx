
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

interface PostMainProps {
  post: any
}

export const PostMain = ({post: { content } }: PostMainProps) => {

  useEffect(() => {
    Prism.highlightAll(content)
  }, [content])

  return (
    
    <article
      className={`post-main
        ${getProse()}
      `}
      dangerouslySetInnerHTML={{ __html: content }} 
    />

  )
  
}