"use client";

import { useEffect } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function ButtonLoad() {
    const formStatus = useFormStatus()
    const { pending } = formStatus

    useEffect(()=>{
        const pendingTrue = document.querySelector("#pending-true") as HTMLElement
        const pendingFalse = document.querySelector("#pending-false") as HTMLElement
        if( pendingTrue && pendingFalse ) {
            if( pending ) {
                pendingTrue.classList.replace("hidden","flex")
                pendingFalse.classList.replace("flex","hidden")
            } else {
                pendingTrue.classList.replace("flex","hidden")
                pendingFalse.classList.replace("hidden","flex")
            }
        }

    },[pending])

    return <span className="w-4/12 h-fit">
        <button
            type="submit"
            className="py-2 px-4 m-0 w-full h-full rounded-r-xl font-semibold shadow-lg bg-green-500 text-white text-sm cursor-pointer active:bg-green-300 hover:bg-green-400"
        >
            {
            pending ?
                <span className="flex flex-row items-center gap-2 p-0">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Buscando...</span>
                </span> :
                <span className="p-0">Buscar</span>
            }
        </button>
        <small className="text-transparent">no</small>
    </span>
}

