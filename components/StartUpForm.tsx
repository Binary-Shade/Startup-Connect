/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useActionState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from '@uiw/react-md-editor'
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createPitch } from "@/lib/action"

const StartUpForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState('')
    const { toast } = useToast()
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (prevState: any, formData : FormData ) =>{
        
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('image') as string,
                pitch
            }
            
            console.log('wroking');
            const res = await formSchema.parseAsync(formValues)
            console.log("🚀 ~ handleFormSubmit ~ res:", res)
            const result = await createPitch(prevState, formData, pitch)
            console.log("🚀 ~ handleFormSubmit ~ result:", result)
            if(result){
                toast({
                    title: "success",
                    description: "Your startup has been created !"
                })
            }
            router.push(`/startup/${result._id}`)
            return result

        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldErr = error.flatten().fieldErrors
                setErrors(fieldErr as unknown as Record<string, string>)
                toast({
                            title: "Error",
                            description: " please check your inputs & try again !",
                            variant : "destructive"
                        })                
                return {...prevState, error: "validation failed", status: "ERRROR"}

            }
            toast({
                title: "Error",
                description: "unexpected error ! hard to solve",
                variant : "destructive"
            })   
            return {
                ...prevState,
                error: "unexpected error", 
                status: "ERROR"
            }
            
        }
        
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INIT"
    })

  return (
    <form className="startup-form" action={formAction}>
        <div>
            <label htmlFor="title" className="startup-form_label">
                Title
            </label>
            <Input 
                id="title"
                name="title"
                required
                placeholder="startup title here"
                className="startup-form_input"
            />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className="startup-form_label">
                Description
            </label>
            <Textarea 
                id="description"
                name="description"
                required
                placeholder="short description of your startup idea"
                className="startup-form_textarea"
            />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className="capitalize startup-form_label">
                category
            </label>
            <Input 
                id="category"
                name="category"
                required
                placeholder="startup category"
                className="startup-form_input"
            />
            {errors.category && <p className="startup-form_error">{errors.category}</p>}
        </div>
        <div>
            <label htmlFor="image" className="capitalize startup-form_label">
                image
            </label>
            <Input 
                id="image"
                name="image"
                required
                placeholder="startup image url here"
                className="startup-form_input"
            />
            {errors.image && <p className="startup-form_error">{errors.image}</p>}
        </div>
        <div data-color-mode='light'>
            <label htmlFor="title" className="startup-form_label">
                Pitch
            </label>
            <MDEditor 
                className="startup-pitch"
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                height={300}
                preview="edit"
                textareaProps={
                    {
                        placeholder : "Describe your startup in brief "
                    }
                }
                previewOptions={{
                    disallowedElements: ['style']
                }}

            />
            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
            {isPending ? 'form submitting ' : "submit your form "}
            <Send className="size-6 "/>
        </Button>
        <div>
            
        </div>
    </form>
  )
}

export default StartUpForm

