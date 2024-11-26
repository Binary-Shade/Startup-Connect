/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID } from '@/sanity/lib/queries'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

export const experimental_ppr = true;

const page = async ({ params } : { params : Promise<{ id : string}> }) => {
  const id = (await params).id
  const post = await client.fetch(STARTUP_BY_ID, { id })  
  const md = markdownit()
  if(!post) return notFound()
  const pitchContent = md.render(post?.pitch || '')
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>
      <section className='section_container'>
        <img src={post.image}  alt={`{post.title} image`} className='w-full h-auto rounded-xl'/>
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'> 
          <div className="flex-between gap-5">
            <Link href={`user/${post.author?._id}`} className='flex items-center gap-3  mb-3'>
              <Image src={post.author.image} alt='author-image' width={64} height={64} className='rounded-full drop-shadow-lg' />
              <div>
                <h1 className='text-20-medium'>{post.author?.name}</h1>
                <p className='!text-black-300'>@{post.author?.username}</p>
              </div>
            </Link>
            <p className='category-tag'>{post?.category}</p>
            </div>
            <h1 className='text-3xl font-bold'>Pitch Details:</h1>
            {
              pitchContent ? (
                <article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{__html: pitchContent}} />
              ) : (
                <p className='no-details'>No Details Provided !</p>
              )
            }
        </div>
      <hr className='divider'/>
      <Suspense fallback={<Skeleton className='view_skeleton'/>}>
            <View id={id}/> 
      </Suspense>
      </section>
      {/* TODO: RECOMMENDED STARTUPS */}
    </>
  )
}

export default page