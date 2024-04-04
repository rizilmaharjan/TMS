import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../hooks/reduxHooks";
import { UsePutRequest } from "../../hooks/usePutRequest";
import { useDispatch } from "react-redux";
import UploadWidget from "../uploadImage/uploadImage";
import { setUsers } from "../../redux/features/user/userSlice";
import {
  UserProfileSchema,
  TUserProfileSchema,
} from "../../Model/userProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross1 } from "react-icons/rx";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfilePicture from "../ProfilePicture/profilePicture";

type TUserProfileProps = {
  closeProfileModal: (val: boolean) => void;
};
export default function Profile({ closeProfileModal }: TUserProfileProps) {
  const userInfo = useAppSelector((state) => state.userInfo.user);
  const userProfilePicture = useAppSelector((state) => state.profilePicture.profilePicture);
  const dispatch = useDispatch();
  const { resData, error, sendPutRequest } = UsePutRequest();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserProfileSchema>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      fullname: userInfo?.fullname,
      username: userInfo?.username,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      gender: userInfo?.gender,
      position: userInfo?.position,
    },
  });

  const onSubmit: SubmitHandler<TUserProfileSchema> = (data) => {
    console.log("i am clicked")
    // Send the FormData to the server
    sendPutRequest(
      `http://localhost:8000/api/v1/users/me`,
      {...data,
      profileImage: userProfilePicture || userInfo?.profileImage
      }
    );
  };

  useEffect(() => {
    if (resData?.status === 200) {
      console.log("editeduserdata",resData)
      dispatch(setUsers(resData.data.editedUser));
      // console.log(resData)
      toast.success("user updated successfully");
      closeProfileModal(false);
      // setProfileImageUrl(resData.data.editedUser.profileImage);
    }
  }, [resData, error]);

  const preventCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        onClick={() => closeProfileModal(false)}
        className="w-full h-screen flex z-50 justify-center fixed left-0 top-0 bottom-0 modalBackground"
      >
        <div
          onClick={(e) => preventCloseModal(e)}
          className="bg-white w-[700px] overflow-y-auto cursor-pointer h-[740px] mt-2 rounded-lg relative py-2 px-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100"
        >
          {/* cross sign */}
          <div
            onClick={() => closeProfileModal(false)}
            className=" absolute right-4 bg-[#ff7444] text-white hover:bg-white hover:text-[#ff7444] hover:border hover:border-[#ff7444] cursor-pointer transition-all ease-in-out duration-300 w-8 h-8 rounded-full flex justify-center items-center"
          >
            <RxCross1 size={22} />
          </div>
          <ProfilePicture />
          {/* form fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6"
          >

            {/* first row */}
            <div className="flex justify-between gap-4">
              {/* full name */}
              <div className="w-80">
                <label className="font-semibold text-md">Full Name</label>
                <input
                  type="text"
                  className="border px-3 py-2 mt-2 rounded-md font-semibold text-sm md:text-base  w-full border-[#c4c4c4] outline-none"
                  autoComplete="off"
                  {...register("fullname")}
                />
                {errors.fullname && (
                  <p className={"text-red-500"}>{errors.fullname.message}</p>
                )}
              </div>
              <div className="w-80">
                <label className="font-semibold text-md">Email</label>
                <input
                  type="email"
                  className="border mt-2 px-3 py-2 w-full rounded-md text-sm md:text-base font-semibold border-[#c4c4c4] outline-none"
                  autoComplete="off"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={"text-red-500"}>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* second row */}
            <div className="flex justify-between gap-4">
              <div className="w-80">
                <label className="font-semibold text-md ">Username</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="border px-3 py-2 mt-2 w-full rounded-md text-sm md:text-md font-semibold border-[#c4c4c4] outline-none"
                  {...register("username")}
                />
                {errors.username && (
                  <p className={"text-red-500"}>{errors.username.message}</p>
                )}
              </div>
              <div className="w-80">
                <label className="font-semibold text-md">Phone</label>
                <input
                  type="number"
                  autoComplete="off"
                  className="border px-3 py-2 mt-2 w-full rounded-md text-sm font-semibold border-[#c4c4c4] outline-none"
                  {...register("phone", {
                    valueAsNumber: true,
                  })}
                />
                {errors.phone && (
                  <p className={"text-red-500"}>{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* third row */}

            <div className="flex justify-between gap-4">
              <div className="w-80">
                <label className="font-semibold text-md">Address</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="border px-3 py-2 mt-2 w-full rounded-md text-sm md:text-md font-semibold border-[#c4c4c4] outline-none"
                  {...register("address")}
                />
                {errors.address && (
                  <p className={"text-red-500"}>{errors.address.message}</p>
                )}
              </div>

              <div className="w-80">
                <label className="font-semibold text-md">Gender</label>
                <select
                  className="w-full mt-2 border border-[#c4c4c4] rounded-md text-sm md:text-md outline-none font-semibold px-3 py-2"
                  {...register("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className={"text-red-500"}>{errors.gender.message}</p>
                )}
              </div>
            </div>

            {/* fourth row */}
            <div className="w-80 gap-4">
              <label className="font-semibold text-md">Position</label>
              <select
                className="w-full mt-2 border border-[#c4c4c4] rounded-md text-sm md:text-md outline-none font-semibold px-3 py-2"
                {...register("position")}
              >
                <option value="web designer">Web Designer</option>
                <option value="devops">DevOps</option>
                <option value="data engineer">Data Engineer</option>
              </select>
              {errors.position && (
                <p className={"text-red-500"}>{errors.position.message}</p>
              )}
            </div>

            {/* submit button */}
            <div className="bg-[#ff7444] w-32 h-10 mt-[2vh] md:w-48 md:h-12 rounded-full font-semibold text-white mx-auto md:mt-14">
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
