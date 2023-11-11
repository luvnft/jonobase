

/*
jonobase
/app/(basis)/loop/loop-count.tsx
results count
*/

export const LoopCount = ({label, resultsCount}: any) => {    
  return (
    <aside className={`loop-count text-sm`}>
      {label} : {resultsCount}
    </aside>
  )
}


