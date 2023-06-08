import { socials } from "@/constants"
import { SocialIcon } from "react-social-icons"

function Socials() {
  return (
    <div className="flex items-center justify-center sm:gap-x-4 mt-14 md:w-[400px]">
        {socials.map((social) => (
            <div key={social.id} className="flex items-center justify-center flex-1 animate-fade-in-3 cursor-pointer
                group md:hover:shadow-outline-gray-focus rounded-[9px] p-5 md:p-10 transition duration-200 ease-out">
                <SocialIcon
                url={social.url}
                fgColor="#C2C3C4"
                bgColor="transparent"
                className="!h-16 !w-16"
                />
                <div className="text-xs sm:text-sm space-y-1">
                    <p className="text-slate-300 group-hover:text-slate-100 transition font-medium">{social.name}</p>

                </div>
            </div>
        ))}
    </div>
  )
}

export default Socials