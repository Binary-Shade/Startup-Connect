import { client } from '@/sanity/lib/client'
import { GITHUB_USER_DETAILS } from '@/sanity/lib/queries'
import React from 'react'

const page = async ({params}: {params: Promise<{ id: string }>}) => {
  const id = (await params).id
  const userInfo = await client.fetch(GITHUB_USER_DETAILS, { id })
  console.log("🚀 ~ page ~ userInfo:", userInfo)
  
  return (
    <div>
        {id}
    </div>
  )
}

export default page