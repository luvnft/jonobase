
/* 
app/not-found.tsx : 404 page 
*/

import { getBase } from '@/app/(basis)/util/data'
import { SectionDiv, Paragraph, Span } from './(basis)/util/tidy-html'

export default async function NotFound() {

  const { lang } = await getBase()

  return (
    <SectionDiv>
      <h1 className={`text-7xl text-center my-10`}>
        <Span>404</Span>
      </h1>
      <Paragraph>
        <Span className={`text-xl`}>{lang.content_not_found}</Span>
      </Paragraph>
    </SectionDiv>
  )
  
}