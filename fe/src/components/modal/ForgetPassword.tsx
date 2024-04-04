import { useEffect, useState } from "react"
import { UsePostRequest } from "../../hooks/usePostRequest"

import { toast } from 'react-toastify';
type TForgetPasswordModal = {
    toggleModal: (val:boolean)=>void
}
export const ForgetPassword = ({toggleModal}:TForgetPasswordModal) => {
    const {resData, error, sendPostRequest} = UsePostRequest()
    const [email, setEmail] = useState("")

    const userEmail = {
        email: email
    }

    const preventModalClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.stopPropagation()
    }
   const handleClick = ()=>{
    sendPostRequest("http://localhost:8000/api/v1/auth/forgot-password", userEmail, false)
   }
   useEffect(() => {
    if (resData?.status === 200) {
        toast.success(resData.data.message)
        toggleModal(false)
    }
    if (error) {
        const errorMessage = (error.response?.data as { message: string })?.message;
        if (errorMessage) {
            toast.error(errorMessage);
        } else {
            toast.error("An error occurred");
        }
    }
  }, [resData, error]);
  return (
    <>
        <div onClick={()=>toggleModal(false)} className="fixed w-full top-0 left-0 z-50 h-screen modalBackground flex items-center justify-center">
            <div onClick={preventModalClose} className="lg:w-[500px] w-[90%] h-[320px] bg-white px-3 rounded-lg">
                <h1 className="text-3xl mt-3 font-bold">Forget Your Password</h1>
                <p className="mt-3 text-gray-600">Please enter the email address you'd like your password reset information sent to</p>

                <div className="mt-5">
                    <label className="text-gray-500 font-semibold" htmlFor="forgetPassword">Enter email address</label><br />
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} autoComplete="off" name="email" className="border mt-1 w-11/12 border-black px-3 text-gray-500 font-semibold outline-blue-700 py-1.5" type="text"/>
                </div>

                {/* request reset link */}
                <button onClick={handleClick} className="bg-blue-950 text-white mt-3 w-11/12 py-2 rounded-lg">Request reset link</button>

                {/* back to login */}
                 <p onClick={()=>toggleModal(false)} className="text-blue-600 font-bold text-center mt-4 cursor-pointer">Back To Login</p>
                

            </div>
        </div>
      
    </>
  )
}

