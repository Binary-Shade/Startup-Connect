/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from '@uiw/react-md-editor'
import { Button } from "./ui/button"
import { Send } from "lucide-react"

const StartUpForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState('')
    const isPending = false
  return (
    <form className="startup-form" action={()=>{}}>
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