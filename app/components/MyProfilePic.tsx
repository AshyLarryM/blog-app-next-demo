import Image from "next/image";

import React from 'react'

export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
        <Image 
            className="border-4 border-black dark:border-sky-600 drop-shadow-xl
            shadow-black rounded-full mx-auto mt-8"
            src = "/images/next-profile-photo.png"
            width={200}
            height={200}
            alt="Lawrence Markel"
            priority={true}
        />
    </section>
  )
}
