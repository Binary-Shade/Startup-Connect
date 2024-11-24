"use client"

import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const ResetForm = () => {

    const reset = () =>{
        const form = document.querySelector('.search-form') as HTMLFormElement
        if(form){
          form.reset();
        }
    }
  return (
    <>
        <button id="reset" className='search-btn reset text-white' onClick={reset} type="button">
            <Link href={'/'}>
              <X className='size-5'/>
            </Link>
        </button>
    </>
  )
}

export default ResetForm