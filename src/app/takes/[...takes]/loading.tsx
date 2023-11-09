import { FC } from 'react'
import { Load } from '@/app/(basis)/util/load-spin'

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div>
      <Load />
    </div>
  )
}

export default Loading
