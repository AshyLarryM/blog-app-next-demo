import { getSortedPostsData, getPostData } from '@/lib/posts'
import { notFound } from "next/navigation"
import getFormattedDate  from '@/lib/getFormattedDate'
import Link from 'next/link';

export function generateStaticParams() {
    const posts = getSortedPostsData();//deduped!

    return posts.map((post) => ({
        postId: post.id
    }))
}

export function generateMetadata({ params }: { params: { postId: string }}) {

    const posts = getSortedPostsData()
    const { postId } = params;

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }

  return (
    <div>page</div>
  )
}


export default async function Post({ params }: { params: { postId: string }}) {

    const posts = getSortedPostsData()
    const { postId } = params;

    if (!posts.find(post => post.id === postId)) {
        return notFound();
    }

    const { title, date, contentHtml } = await getPostData(postId);

    const pubDate = getFormattedDate(date);

  return (
    <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
        <h1 className='text-3xl mt-24 mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>{title}</h1>
        <p className='mt-0'>
            {pubDate}
        </p>
        <article>
            <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <p>
                <Link className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700' href='/'>Back to home</Link>
            </p>
        </article>
    </main>
  )
}
