import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: BlogPost
}

export default function ListItem({ post }: Props) {

  const { id, title, date } = post
  const formattedDate = getFormattedDate(date)

  return (
    <li className="mt-4 text-2xl dark:text-white/90 mx-4 ">
      <Link className="underline hover:text-black/20 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" href={`/posts/${id}`}>{title}</Link>
      <br />
      <p className="text-sm mt-1">{formattedDate}</p>
    </li>
  )
}