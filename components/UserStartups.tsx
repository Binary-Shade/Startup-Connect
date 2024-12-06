import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard from './StartupCard'
import { Author, Startup } from "@/sanity/types"


export type StartupType = Omit<Startup , "author"> & {author?: Author}


const UserStartups = async ({id}: {id: string}) => {
    const result =  await client.fetch(STARTUP_BY_AUTHOR, { id })
    return (
        <>
            {
                result.length > 0 ? (
                    result.map((startup : StartupType) => (
                        <StartupCard key={startup._id} post={startup}/>
                    ))
                ) : (
                    <p className='no-result'>no posts available !</p>
                )
            }
        </>
      );
      
}

export default UserStartups