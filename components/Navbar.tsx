import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()
    
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans text-black'>
        <nav className='flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='logo' width={144} height={30} />
            </Link>
            <div className='flex items-center gap-5'>
                {
                    session && session?.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span>Create</span>
                            </Link>
                            <form action={async()=>{
                                "use server";
                                await signOut({redirectTo: '/'})
                            }}>
                                <button type='submit'>log out</button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                                <Image src={session?.user.image} className='avatar' alt='user-image' width={35} height={35}/>
                            </Link>
                        </>
                    ): (
                        <form action={async () =>{
                            "use server";
                            await signIn('github');
                        }}>
                            <button type='submit'>
                                <span>SignIn</span>
                            </button>
                        </form>
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar