'use client'
import { CheckIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { gsap } from 'gsap'
import { useState, useRef, FormEvent } from 'react'
import { getPlaneKeyframes } from '@/lib/getPlaneKeyframes'
import { getTrailsKeyframes } from '@/lib/getTrailsKeyframes'

export default function NewsletterForm() {

    const [input, setInput] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<MembersSuccessResponse>()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const buttonRef = useRef<HTMLButtonElement>(null)
    const { to, fromTo, set } = gsap

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = input;
        const button = buttonRef.current;

        if (!email || !button) return;

        if (!active) {
            setActive(true);

            //to gsap animation -animation for planes
            to(button, {
                keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
            });

            //to gsap animation
            to(button, { keyframes: getTrailsKeyframes(button) });
        }

        // POST request to /api/addSubscriber
        const res = await fetch("/api/addSubscriber", {
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });

          const data = await res.json();

          if (data.error) {
            setErrorMessage('You are already subscribed!')
            setSuccessMessage(undefined);
            return;
          }

        setSuccessMessage(data.response);
        setErrorMessage('');
    };

    console.log(errorMessage)

    const dismissMessages = () => {
        setSuccessMessage(undefined);
        setErrorMessage('');
    };

  return (
    <div className='flex flex-col space-y-8 md:w-[400px]'>
        <form className='newsletter-form mt-10 animate-fade-in-3' onSubmit={handleSubmit}>
            <div className='group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px] bg-slate-900 
            hover:bg-slate-800 shadow-outline-gray hover:shadow-transparent focus-within:bg-slate-800
            focus-within:!shadow-outline-gray-focus transition-all duration-300'>
                <EnvelopeIcon className='hidden sm:inline w-6 h-6 text-slate-500 group-focus-within:text-slate-200
                group-hover:text-slate-200 transition-colors duration-300' />
                <input value={input} 
                onChange={e => setInput(e.target.value)} 
                type="email" 
                placeholder="Email address" 
                required
                className='flex-1 text-slate-`00 text-sm sm:text-base outline-none placeholder-slate-300 
                group-focus-within:placeholder-slate-1å00 bg-transparent placeholder:transition-colors placeholder:duration-300'
                />
                <button ref={buttonRef} disabled={!input} type='submit' 
                className={`${active && 'active'}disabled:!bg-[#263b59] disabled:grayscale-[65%] 
                disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base`}>
                <span className="default">Subscribe</span>
                    <span className="success">
                    <svg viewBox="0 0 16 16">
                        <polyline points="3.75 9 7 12 13 5"></polyline>
                    </svg>
                    Done
                    </span>
                    <svg className="trails" viewBox="0 0 33 64">
                    <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
                    <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
                    </svg>
                    <div className="plane">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </button>
            </div>
        </form>

        <div className='relative'>
            {(successMessage || errorMessage) && (
                <div className='flex items-start space-x-2 bg-slate-800 shadow-outline-gray text-slate-200 rounded-[9px]
                py-4 px-6 animate-fade-bottom absolute'>
                    <div className='h-6 w-6 bg-slate-800 flex items-center justify-center rounded-full border 
                    border-sky-900 flex-shrink-0'>
                        <CheckIcon className='h-4 w-4 text-slate-400' />
                    </div>
                    <div className='text-xs sm:text-sm text-slate-400'>
                    {successMessage ? (
                        <p>
                        We&apos;ve added{" "}
                        <span className="text-slate-300">
                            {successMessage.email_address}
                        </span>{" "}
                        to our blog email list. You will receive an email when a new post is published!
                        </p>
                    ) : (
                        <p>
                        You are already subscribed to the blog.  Check your email for the latest posts!
                        </p>
                        )}
                    </div>
                    <XMarkIcon className='h-5 w-5 cursor-pointer flex-shrink-0 text-slate-200' 
                    onClick={dismissMessages}/>
                </div>
            )}

        </div>
    </div>
  )
}