import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import React from "react"
import Image from 'next/image'
import { Button } from "./ui/button"


const StartupCard = ({post}: {post: PostCardType}) => {
    const {_id, title, description, _createdAt, views, category, image, author:{_id: author_id, name}} = post
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
                        <p className="text-16-medium line-clamp-1">{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className="text-26-semibold line-clamp-1">{title}</p>
                    </Link>
                </div>
                <Link href={`/user/${author_id}`}>
                        <Image src={'https://placehold.co/48x48'} alt="placeholder" width={48} height={48} className="rounded-full"/>
                </Link>
            </div>
                <Link href={`/startup/${_id}`}>
                    <p className="startup-card_desc">{description}</p>
                    <img src={image} alt="placeholder" className="startup-card_img"/>
                </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
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

export default StartupCard