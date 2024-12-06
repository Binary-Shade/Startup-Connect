import { auth } from '@/auth'
import StartupCard, { StartupSkeleton, StartupType } from '@/components/StartupCard'
import UserStartups from '@/components/UserStartups'
import { client } from '@/sanity/lib/client'
import { GITHUB_USER_DETAILS, RECENT_POSTS } from '@/sanity/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

export const experimental_ppr = true

const page = async ({params}: {params: Promise<{ id: string }>}) => {
  const session = await auth()
  const id = (await params).id
  const [user, recents] = await Promise.all([
    client.fetch(GITHUB_USER_DETAILS, { id }),
    client.fetch(RECENT_POSTS),
  ])
  
  if(!user) return notFound()
  const processBio = (bioText: string) => {
      
      const emojiMap: {[key: string]: string} = {
        ':man_technologist:': '👨‍💻',
        ':lady_beetle:': '🐞',
        ':cactus:': '🌵',
        ':zzz:': '💤',
      };
    
      let processedText = bioText;
      Object.keys(emojiMap).forEach((shortcode) => {
        processedText = processedText.replace(new RegExp(shortcode, 'g'), emojiMap[shortcode]);
      });
    
      processedText = processedText.replace(/\r\n|\n|\r/g,"  ");
    
      return processedText;
    };
  
  return (
    <>
    <div className='profile_container'>
      <div className="profile_card">
        <div className="profile_title">
          <h3 className='text-24-black uppercase text-center line-clamp-1'>{user?.name}</h3>
        </div>
        <Image
          src={user.image}
          width={220}
          height={220}
          alt='github-profile'
          className='profile_image'
        />
        <p className='text-xl mt-7 text-white'>@{user.username}</p>
        <p className='text-14-normal mt-2 text-center'>{processBio(user.bio)}</p>
      </div>
      <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
        <p className='text-30-bold'>
          {session?.id === id ? "Your": "All"} startups
        </p>
        <ul className='card_grid-sm'>
          <Suspense fallback={<StartupSkeleton />}>
            <UserStartups id={id} />
          </Suspense>
        </ul>
      </div>  
    </div>
    <div className='profile_card_container'>
    {
      recents.length > 0 ? (
        <div className='mx-auto'>
        <h1 className='text-30-bold'>Recent startups :</h1>
        <ul className='mt-7 card_grid'>
          {
            recents.map((startup: StartupType, i: number) => (
              <StartupCard key={i} post={startup}/>
            ))
          }
        </ul>
      </div>
      ) : (
        <p className='text-red-500'>no recent posts</p>
      )
    }
    </div>
    </>
  )
}

export default page