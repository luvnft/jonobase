import PocketBase from 'pocketbase'
import Link from 'next/link'
import Image from 'next/image'

async function getPost(slug: string) {

  const pb = new PocketBase(domain)
  const post = await pb.collection('posts').getFirstListItem(`slug='${slug}'`)    
  
  let olderPost, newerPost
  try {
    olderPost = await pb.collection('posts').getFirstListItem(`backdate < '${post.backdate}'`) 
  } catch (e) {
    olderPost = null
  }
  try {
    newerPost = await pb.collection('posts').getFirstListItem(`backdate > '${post.backdate}'`)
  } catch (e) {
    newerPost = null
  }

  return { post, olderPost, newerPost }

}

export default async function Post({ params }: any) {

  const data = await getPost(params.slug)
  const { post, olderPost, newerPost } = data

  return (
    <div>
      <h1>posts/{post.slug}</h1>
      <div>              
        <p>{post.title}</p>
        <p>{post.created}</p>

        <p><Image src={`${domain}/api/files/${post.collectionId}/${post.id}/${post.thumbnail}`} alt="" height={600} width={600} /></p>

        {olderPost && <p>older: <Link href={`/posts/${olderPost.slug}`}>{olderPost.title}</Link></p>}
        {newerPost && <p>newer: <Link href={`/posts/${newerPost.slug}`}>{newerPost.title}</Link></p>}
      </div>
    </div>
  )

}