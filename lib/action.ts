/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth } from "@/auth"
import { parsify } from "./utils"
import slugify from 'slugify'
import { sanityWrite } from "@/sanity/lib/client-write"

export const createPitch = async (state: any, form: FormData, pitch: string) =>{
    const session = await auth()
    console.log("🚀 ~ createPitch ~ session:", session)
    if(!session){
        parsify( {
            status: "ERROR",
            error: "not logged in"
        })
    }

    const {title, description, category, image} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    )

    const slug = slugify(title as string, {
        lower: true,
        strict: true
    })

    try{
        const details = {
            title,
            description,
            category,
            image,
            slug: {
                _type: "slug",
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
            pitch
        } 

        const result = await sanityWrite.create({
            _type: "startup",
            ...details
        })
        console.log("🚀 ~ createPitch ~ result:", result)
        
        return result

    }catch(err){
        console.error(err);
        
        
    }

}