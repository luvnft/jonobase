
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

export async function getHomePage() {

  try {

    const pb = new PocketBase(process.env.PBDOMAIN) 

    const app = await pb.collection('bases')
      .getFirstListItem(`slug='${process.env.PBSLUG}'`, { "expand": "homepage_content" })

    return { app }

  } catch {
    
    return { app: { expand: { homepage_content: {}}} }

  }

}

export async function getUnpagedPostsCount(
  find: string = '%', 
  kind: any = '',
  list: any = '',   
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const base = await getBaseID()

  const data = { pb, base, find, kind, list }
  const filtering = await getQueryFilter(data)
  
  const items = await pb.collection('posts')
    .getFullList({ 
      sort: `-featured, -created, -backdated`,
      filter: filtering
    }) 
    
  return items.length
}

export async function getPosts(
  find: string = '%',
  kind: string = '%', 
  list: string = '', 
  page: number = 1,   
  limit: number = 6,  
) {

  const pb = new PocketBase(process.env.PBDOMAIN)

  const base = await getBaseID() 

  const data = { pb, base, find, kind, list }
  const filtering = await getQueryFilter(data)
    
  const items = await pb.collection('posts')
    .getList(page, limit, { 
      sort: `-featured, -created, -backdated`,
      filter: filtering,
      expand: 'kind,lists'
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
      `, { expand: 'kind,lists' })      

    return { post } 

  } catch {

    const post = { title: '', kind: '', lists: [] }
    return { post }
  
  }

}

export async function getAdjacentPost(
  post: any,
  direction: "newer" | "older", 
  filter: "site" | "kind"
) {

  let filtering = ''
  
  try {

    const pb = new PocketBase(process.env.PBDOMAIN) 
    
    const base = await getBaseID()

    if (base !== '') 
      filtering += ` bases?~'${base}' &&`    

    switch (filter) { 
      // get all the posts     
      case "site":
        filtering += ``
        break;
      // filter by post kind
      case "kind":
        filtering += `kind='${post.kind}' && `
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
        {expand: 'bases,files,kind,lists'}
      )
      
    return adjacentPost
    
  } catch {

    return null

  }

}

export async function getTake(
  slug: any
) {

  try {

    const pb = new PocketBase(process.env.PBDOMAIN)  

    const take = await pb.collection('takes')
      .getFirstListItem(`slug='${slug}'`, 
        { expand: 'views' }
      )    
  
    return { take }
  
  } catch {

    const take = { public_name: '', views: [], expand: { views: [{}]} }

    return { take }

  }

}

// helper for the getUnpagedPostsCount and getPosts

export async function getQueryFilter({ pb, base, find, kind, list }: any ) {
      
  let filtering = ''

  if (base !== '') 
    filtering += ` bases?~'${base}'`
  if (find !== '')
    filtering += ` && ( 
      title?~'${find}' || 
      summary?~'${find}' || 
      content?~'${find}' 
    )`  

  if (kind === 'all') kind = '%'  

  // search for the kind in the kinds table
  const { items: kinds } = await pb.collection('kinds')
    .getList(1, 1, { filter: `slug='${kind}'`})

  // if the desired kind exists, then get its id
  if (kinds[0]) {
    // add the kind id to the filter
    filtering += ` && kind?~'${kinds[0].id}'`
  } else {
    // or else, ensure nothing returns by using a bogus query    
    filtering += (kind) ? ` && kind='NULL DO NOT SEARCH'` : ''
  }
  
  if (list === 'all') list = '%'

  // search for the list in the lists table
  const { items: lists } = await pb.collection('lists')
    .getList(1, 1, { filter: `slug='${list}'`})    
  
    // if the desired list exists, then get its id
  if (lists[0]) { 
    // add the list id to the filter
    filtering += ` && lists?~'${lists[0].id}'` 
  } else {
    // or else, ensure nothing returns by using a bogus query
    filtering += (list) ? ` && lists='NULL DO NOT SEARCH'` : ''
  }

  // ensure all posts are published
  filtering += ` && status='published'`

  return filtering

}