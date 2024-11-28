import { auth } from '@/auth'
import StartUpForm from '@/components/StartUpForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await auth()
    if(!session) redirect("/")
  return (
    <>
        
        <section className='pink_container !min-h-[230px]'>
            <h1 className='heading'>Submit Your Startup Pitch !</h1>
        </section>
        {
            session ? (
                <StartUpForm />
            ) : (
                <p className='text-xl text-center mt-10 text-red-500'>Login first to create startup !</p>
            )
        }
    </>
  )
}

export default page