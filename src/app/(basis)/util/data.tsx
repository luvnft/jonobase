
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
  term: any = '',
  query: string = '%', 
) {

  const pb = new PocketBase(process.env.PBDOMAIN)
  const baseId = await getBaseID()

  term = (term === 'all') ? '' : term

  const { items: topicMatched } = await pb.collection('terms')
    .getList(1, 1, { filter: `slug='${term}'`})   

  let filtering = `post_type='${type.replace(/'/g,'')}'`
  
  if (query !== '')
    filtering = `( title?~'${query}' || summary?~'${query}' || content?~'${query}' )`
  if (query === 'all') 
    filtering = `( title?~'%' || summary?~'%' || content?~'%' )`  
  if (baseId !== '') {
    filtering += ` && bases?~'${baseId}'`
  }
  if (topicMatched[0]) {
    filtering += ` && terms?~'${topicMatched[0].id}'` 
  } else {
    if (term) {
      filtering += ` && terms='NULL'`
    }
  } 

  const list = await pb.collection('posts')
    .getFullList({ 
      sort: `-featured, -created, -backdated`,
      filter: filtering
    }) 
    
  return list.length
}

export async function getContentList(
  type: string, 
  page: number = 1, 
  term: string = '', 
  limit: number = 6,
  query: string = ''
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const baseId = await getBaseID() 

  term = (term === 'all') ? '' : term

  // terms are tags
  const { items: topicMatched } = await pb.collection('terms')
    .getList(1, 1, { filter: `slug='${term}'`})   
  
  let filtering = `post_type='${type.replace(/'/g,'')}'`

  if (query !== '')
    filtering = `( title?~'${query}' || summary?~'${query}' || content?~'${query}' )`
  if (baseId !== '') 
    filtering += ` && bases?~'${baseId}'`
  if (topicMatched[0]) { 
    // find the exact term 
    filtering += ` && terms?~'${topicMatched[0].id}'` 
  } else {
    if (term) {
      // don't return posts if the term has no posts
      filtering += ` && terms='NULL'`
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
      `, { expand: 'terms' })      

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
        {expand: 'bases,files,path,terms,versions'}
      )
      
    return adjacentPost
    
  } catch {

    return null

  }

}
