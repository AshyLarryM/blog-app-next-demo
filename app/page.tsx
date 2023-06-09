import Posts from "./components/Posts"
import MyProfilePic from "./components/MyProfilePic"


export default function Home() {
  return (
    <main>
      <MyProfilePic />
      <p className='mt-12 mb-12 text-3xl text-center dark:text-slate-200'>
        Hello and Welcome 👋 &nbsp;
        <span className='whitespace-nowrap'>
          I'm <span className='font-bold'>Lawrence</span>.
        </span>
      </p>
      <Posts />
    </main>
  )
}
