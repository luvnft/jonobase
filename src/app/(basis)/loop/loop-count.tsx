

/*
jonobase
/app/(basis)/loop/loop-count.tsx
results count
*/

interface LoopCountProps {
  label: string,
  resultsCount: number,
}

export const LoopCount = ({label, resultsCount}: LoopCountProps) => {    
  return (
    <aside className={`loop-count text-sm`}>
      {label} : {resultsCount}
    </aside>
  )
}


