import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
        navigate("/dashboard")
        }, 2000)
    })
  return (
    <div className='bg-gray-100 w-screen h-screen flex justify-center items-center'>
        <div className="bg-slate-100 rounded-md shadow-md p-2 flex flex-col gap-2 justify-center items-center w-fit">
            <svg className='w-20 h-20 text-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>
            <h1 className="font-bold text-4xl">Your Balance is not enough :(</h1>
        </div>
    </div>
  )
}
