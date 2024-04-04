import Button from "../components/button/Button";
import registerImg from "../../src/assets/images/register.jpg";
import { registerData } from "../components/datas/registrationData";
import { RegisterSchema } from "../Model/registerSchema";
import { TRegisterSchema } from "../Model/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsePostRequest } from "../hooks/usePostRequest";
import { toast } from "react-toastify";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  // custom hook
  const { resData, error, isLoading, sendPostRequest, setError } =
    UsePostRequest();
  // usenavigate hook
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    sendPostRequest("http://localhost:8000/api/v1/users", data, false);
  };
  useEffect(() => {
    if (resData?.status === 201) {
      navigate("/");
      toast.success("user registered successfully")
      return;
    }
    if (error) {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage);
      setError(null);

      return;
    }
  }, [resData, error, isLoading]);
  return (
    <>
      {/* registrationn form */}
      <div>
        <div className="flex gap-14 h-screen pl-10 items-center w-full lg:w-11/12">
          {/* form */}
          <div className="lg:w-1/2 flex justify-end">
            <form className="lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-2xl">Create an account</h1>
              {registerData.map((item) => (
                <div key={item.id} className="mt-6 relative w-full">
                  {item.type === "number" ? (
                    <input
                      className={`border px-8 w-full h-10 ${
                        errors[item.name] ? "border-red-500 border-2" : ""
                      } border-black focus:border-2 focus-border-blue-700 outline-none`}
                      placeholder={item.title}
                      autoComplete="off"
                      {...register(item.name, {
                        valueAsNumber: true, // Convert the value to a number
                      })}
                      type={item.type}
                    />
                  ) : (
                    <input
                      className={`border px-8 w-full h-10 ${
                        errors[item.name] ? "border-red-500 border-2" : ""
                      } border-black focus:border-2 focus-border-blue-700 outline-none`}
                      placeholder={item.title}
                      autoComplete="off"
                      {...register(item.name)}
                      type={item.type}
                    />
                  )}
                  <item.icon className="absolute top-3 left-2" />
                  {errors[item.name] && (
                    <p className={"text-red-500"}>
                      {errors[item.name]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="bg-blue-500 text-white font-semibold w-full mt-10 h-10">
                <Button isSubmitting={isSubmitting}>
                  <span>Register</span>
                </Button>
              </div>
              <p className="mt-4">
                Already have an account?
                <span
                  onClick={() => navigate("/")}
                  className="ml-1 text-blue-500 cursor-pointer font-semibold"
                >
                  Log In
                </span>
              </p>
            </form>
          </div>

          {/* image */}
          <div className="w-1/2 hidden md:block">
            <img src={registerImg} alt="register" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
