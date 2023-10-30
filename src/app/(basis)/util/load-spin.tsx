import Image from 'next/image'

export async function Load() {
  
  return (
    <section className={`flex flex-row w-full h-[50vh] justify-center items-center`}>
      <div>
        <Image src={`/images/load-spin.gif?v=${Date.now()}`} alt={`loading`} height={64} width={64} />          
      </div>
    </section>   
  )
  
}