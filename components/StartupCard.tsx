/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import React from "react"
import Image from 'next/image'
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"
import { Skeleton } from "./ui/skeleton"

export type StartupType = Omit<Startup , "author"> & {author?: Author}

const StartupCard = ({post}: {post: StartupType}) => {
    const {_id, title, description, _createdAt, views, category, image, author} = post


  return (
    <> 
        <li className="startup-card group">
            <div className="startup_card_date flex justify-between">
                {formatDate(_createdAt)}
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary"/>
                <span className="text-16-medium">{views}</span>
            </div>
            </div>
            <div className="flex-between gap-5 mt-5">
                <div className="flex-1">
                    <Link href={`/user/${_id}`}>
                        <p className="text-16-medium line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className="text-26-semibold line-clamp-1">{title}</p>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                        <Image src={author?.image!} alt="placeholder" width={48} height={48} className="rounded-full"/>
                </Link>
            </div>
             {/* ! -> (Non-Null Assertion Operator): */}
                <Link href={`/startup/${_id}`}>
                    <p className="startup-card_desc">{description}</p>
                    <img src={image!} alt="placeholder" className="startup-card_img"/>
                </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn">
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    </>
  )
}

export const StartupSkeleton = () => (
    <>
        {
        [0,1,2,3,4].map((item: number) => (
            <Skeleton key={item} className="startup-card_skeleton"/>
        ))
    }
    </>
)

export default StartupCard