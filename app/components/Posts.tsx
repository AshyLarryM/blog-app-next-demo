import { getSortedPostsData } from "@/lib/posts"
import ListItem from "./ListItem"


export default function Posts() {
    const posts = getSortedPostsData()

  return (
    <section className="text-center md:mt-6 mx-10 max-w-2xl">
      
        <h2 className="text-4xl font-bold dark:text-slate-200">Blog</h2>
        <ul className="w-full">
            {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
    </section>
  )
}
