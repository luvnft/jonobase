
/*
jonopoco
/app/(basis)/util/data.tsx
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
    filtering += ` && topics~'${topicMatched[0].id}'` 
  } else {
    if (topic) {
      filtering += ` && topics='NULL'`
    }
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
    .getFullList({ 
      sort: sorting,
      filter: filtering
    }) 
    
  return list
}

export async function getContentList(
  type: string, 
  page: number = 1, 
  topic: string = '', 
  limit: number = 6
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const baseId = await getBaseID() 

  
  // "topics" are tags and are also known as "cases"
  const { items: topicMatched } = await pb.collection('cases')
    .getList(1, 1, { filter: `slug='${topic}'`})   
    
  let filtering = `post_type='${type.replace(/'/g,'')}'`
  if (baseId !== '') 
    filtering += ` && bases?~'${baseId}'`
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

  const list = await pb.collection('posts')
    .getList(page, limit, { 
      sort: `-featured, -created, -backdated`,
      filter: filtering
    })  

  
  return list 

}

export async function getPost(  
  slug: any,   
  type: any
) {

  try {

    const pb = new PocketBase(process.env.PBDOMAIN)  

    const post = await pb.collection('posts')
      .getFirstListItem(`
        slug='${slug}' && post_type='${type}'
      `, { expand: 'topics' })      

    return { post } 

  } catch {

    const post = { title: '' }
  
    return { post }
  
  }

}

export async function getAdjacentPost(
  post: any,
  direction: "newer" | "older", 
  filter: "site" | "type" | "book"
) {

  let filtering = ''
  
  try {

    const pb = new PocketBase(process.env.PBDOMAIN)  

    switch (filter) {
      case "site":
        filtering += ``
        break;
      case "type":
        filtering += `post_type='${post.post_type}' && `
        break;
      case "book":
        filtering += `book='${post.book || `NULL`}' && `
        break;
    }

    switch (direction) {
      case "newer":
        filtering += `created > '${post.created}'`                  
        break;
      case "older":
        filtering += `created < '${post.created}'`
        
        break;      
    }    

    const adjacentPost = await pb.collection('posts')
      .getFirstListItem(filtering, 
        {expand: 'bases,files,path,topics,versions'}
      )
      
    return adjacentPost
    
  } catch {

    return null

  }

}
