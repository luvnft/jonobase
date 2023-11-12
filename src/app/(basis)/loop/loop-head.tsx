

/*
jonobase
/app/(basis)/loop/loop-head.tsx
head of page containing both breadcrumbs and results count
*/
import { ChildrenProps } from "../util/types"

export const LoopHead = ({children}: ChildrenProps) => {
  return (
    <div
      className={`loop-head 
        flex flex-row justify-between items-center
      `}
    >
      {children}
    </div>
  )
}


