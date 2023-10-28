import Image from 'next/image'
import { getBase } from './data'

export async function Load() {

  const { lang } = await getBase()

  return (
    <section className={`flex flex-row w-full h-[50vh] justify-center items-center`}>
      <div>
        <Image src={`/images/load-spin.gif?v=${Date.now()}`} alt={lang.loading} height={64} width={64} />          
      </div>
    </section>   
  )
  
}