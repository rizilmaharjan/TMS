import login from "../assets/images/login.png";
import { loginData } from "../components/datas/loginData";
import { FaUserAlt } from "react-icons/fa";
import Button from "../components/button/Button";
import {SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../Model/loginSchema";
import { TLoginSchema } from "../Model/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsePostRequest } from "../hooks/usePostRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgetPassword } from "../components/modal/ForgetPassword";

import Cookies from "js-cookie";

import { useEffect, useState } from "react";


const Login = () => {
  // custom post hook
  const {isLoading,error,setError,resData,sendPostRequest} = UsePostRequest()

  const [toggleModal, setToggleModal] = useState(false)

  // navigate hook
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    sendPostRequest("http://localhost:8000/api/v1/auth",data,false)

  };
  useEffect(()=>{
    if(resData?.status === 200){
      navigate("/overview")
      Cookies.set("authToken",resData.data.token, {expires: 1})
      return
    }
    if(error){
      const errorMessage = (error.response?.data as { message: string })
      ?.message;
    toast.error(errorMessage);
    setError(null);

    return;
    }

  },[resData,error,isLoading])

  return (
    <>
    {
      toggleModal && <ForgetPassword toggleModal={(val)=>setToggleModal(val)} />
    }
      <div className="h-screen flex items-center justify-center">
        <div className="lg:w-[55%] w-[90%] lg:h-[500px] bg-white boxShadow2 rounded-2xl flex">
          {/* login form */}
          <div className="w-full py-7 lg:py-0 lg:mt-14">
            {/* user logo */}
            <div className="bg-blue-600 w-14 h-14 mx-auto flex items-center rounded-full">
              <FaUserAlt className="mx-auto" size={32} color="#fff" />
            </div>
            {/* text */}
            <h1 className="text-center mt-4 text-2xl font-semibold">
              User Log in
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginData.map((item) => (
                <div key={item.id} className="w-8/12 ml-6 lg:mx-auto mt-4 relative">
                  <input className="border px-8 h-10 border-blue-700 focus:border-2 focus:border-blue-700 outline-none w-72 md:w-full" type={item.type} autoComplete="off" {...register(item.name)} placeholder={item.title} />
                  <item.icon className="absolute top-[11px] left-2" />
                  {
                    errors[item.name] && (
                      <p className={"text-red-500"}>
                        {errors[item.name]?.message}
                      </p>
                    )
                  }
                </div>
              ))}
              {/* login button */}
              <div className="bg-blue-600 ml-6 lg:mx-auto  md:w-8/12 w-32 mt-4 text-white h-9 md:h-11">
                <Button isSubmitting={isSubmitting}>LOGIN</Button>
              </div>
            </form>

            {/* forget password and signup section */}
            <div className=" mt-8 lg:w-8/12 ml-6 lg:mx-auto">
              {/* forget password */}
              <p className="text-md lg:text-base">
                Forgot
                <span onClick={()=>setToggleModal(true)} className="text-blue-600 cursor-pointer"> Password?</span>
              </p>
              {/* already have an account */}
              <p className="text-md lg:text-base">
                Don't have an account?
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-600 pl-1 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
          {/* image */}
          <div className="w-full hidden lg:block h-full">
            <img src={login} alt="login" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
