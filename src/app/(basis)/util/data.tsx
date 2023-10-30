
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
  find: string = '%', 
  kind: any = '',
  list: any = '',   
  
) {

  const pb = new PocketBase(process.env.PBDOMAIN)
  const base = await getBaseID()

  if (list === 'all') list = ''

  const { items: lists } = await pb.collection('lists')
    .getList(1, 1, { filter: `slug='${list}'`})   

  let filtering = ''

  if (base !== '') 
    filtering += ` bases?~'${base}'`
  if (find !== '')
    filtering += ` && ( title?~'${find}' || summary?~'${find}' || content?~'${find}' )`  
  if (kind !== '') 
    filtering += ` && kind='${kind}'`
  if (lists[0]) { 
    // find the exact list 
    filtering += ` && lists?~'${lists[0].id}'` 
  } else {
    if (lists[0]) {
      filtering += ` && lists='NULL'`
    }
  }  

  const items = await pb.collection('posts')
    .getFullList({ 
      sort: `-featured, -created, -backdated`,
      filter: filtering
    }) 
    
  return items.length
}

export async function getContentList(
  find: string = '%',
  kind: string = '%', 
  list: string = '', 
  page: number = 1,   
  limit: number = 6,  
) {

  const pb = new PocketBase(process.env.PBDOMAIN)
  const base = await getBaseID() 

  if (list === 'all') list = ''

  // lists are tags
  const { items: lists } = await pb.collection('lists')
    .getList(1, 1, { filter: `slug='${list}'`})   
  
  let filtering = ''

  if (base !== '') 
    filtering += ` bases?~'${base}'`
  if (find !== '')
    filtering += ` && ( title?~'${find}' || summary?~'${find}' || content?~'${find}' )`  
  if (kind !== '') 
    filtering += ` && kind='${kind}'`
  if (lists[0]) { 
    // find the exact list 
    filtering += ` && lists?~'${lists[0].id}'` 
  } else {
    if (lists[0])
      filtering += ` && lists='NULL'`
  }
    
  const items = await pb.collection('posts')
    .getList(page, limit, { 
      sort: `-featured, -created, -backdated`,
      filter: filtering
    })  

  return items 

}

export async function getPost(  
  slug: any,  
) {

  try {

    const pb = new PocketBase(process.env.PBDOMAIN)  

    const post = await pb.collection('posts')
      .getFirstListItem(`
        slug='${slug}' 
      `, { expand: 'lists' })      

    return { post } 

  } catch {

    const post = { title: '' }
    return { post }
  
  }

}

export async function getAdjacentPost(
  post: any,
  direction: "newer" | "older", 
  filter: "site" | "kind" | "book"
) {

  let filtering = ''
  
  try {

    const pb = new PocketBase(process.env.PBDOMAIN)  

    switch (filter) {
      case "site":
        filtering += ``
        break;
      case "kind":
        filtering += `kind='${post.kind}' && `
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
        {expand: 'bases,files,path,lists'}
      )
      
    return adjacentPost
    
  } catch {

    return null

  }

}
