
/*
jonopoco
/app/zones/page.tsx
static pages for content that cannot be translated
exploit the next.js folder and file system for flexible organization! 
*/

import { Section } from "../(basis)/util/tidy-html"

export default function Main() {
  return (
    <Section>
      <h2 className={`text-lg md:text-2xl uppercase`}>Zones</h2>   
      <p>Add static pages here for content that cannot be translated!</p>       
    </Section>
  )
}

