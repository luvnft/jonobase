
/*
jonopoco
/app/basis/util/data.tsx
access to the database and other variables
*/

import PocketBase from 'pocketbase'

export async function getBase() {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const app = await pb.collection('bases')
    .getFirstListItem(`slug='${process.env.PBSLUG}'`)
  
  const lang = await pb.collection('i18ns')
    .getFirstListItem(`id='${app.language}'`)

  return { app, lang }

}

export async function getBaseID() {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const { id } = await pb.collection('bases')
    .getFirstListItem(`slug='${process.env.PBSLUG}'`) 

  return id

}

export async function getFullContentCount(
  type: any,
  topic: any = '',
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const base = await getBaseID()

  const { items: topicMatched } = await pb.collection('cases')
    .getList(1, 1, { filter: `slug='${topic}'`})   

  let filtering = ''
  if (base !== '') {
    filtering += `bases?~'${base}'`
  }
  if (topicMatched[0]) {
    filtering += ` && topics?~'${topicMatched[0].id}'` 
  } else {
    if (topic) {
      filtering += ` && topics='NULL'`
    }
  }

  const count = await pb.collection(type)
    .getFullList({ filter: filtering }) 
    
  return count.length
}

export async function getContentList(
  type: any, 
  page: number = 1, 
  topic: any = '', 
  limit: number = 6
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const baseId = await getBaseID()   

  if (isNaN(page) || isNaN(limit)) return []
  
  // "topics" are tags and are also known as "cases"
  const { items: topicMatched } = await pb.collection('cases')
    .getList(1, 1, { filter: `slug='${topic}'`})   
    
  let filtering = ''
  if (baseId !== '') 
    filtering += `bases?~'${baseId}'`
  if (topicMatched[0]) { 
    // find the exact topic 
    filtering += ` && topics?~'${topicMatched[0].id}'` 
  } else {
    if (topic) {
      // don't return posts if the topic has no posts
      filtering += ` && topics='NULL'`
    }
    // otherwise return posts
  }
  
  // sorting depending on post type
  let sorting = ''
  switch (type) {
    case "posts":
    case "works":
      sorting = `-featured, -backdated`
      break;    
    default: 
      sorting = `-featured, -created`
  }

  const list = await pb.collection(type)
    .getList(page, limit, { 
      sort: sorting,
      filter: filtering
    })  

  return list 

}

export async function getContentMeat(

) {

}
