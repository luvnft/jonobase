import Image from 'next/image'
import { SectionDiv } from './tidy-html'

export function Load() {
  
  return (
    <SectionDiv className={`min-h-screen flex justify-center items-center`}>
      <Image src={`/images/load-spin.gif?v=${Date.now()}`} alt={`loading`} height={64} width={64} />
    </SectionDiv>
  )
  
}