import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Profile from "../components/modal/Profile";
import { useAppSelector } from "../hooks/reduxHooks";

export default function UserProfile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const loggedUserInfo = useAppSelector((state)=>state.userInfo.user)
  return (
    <>
      {
        isProfileModalOpen && <Profile closeProfileModal={(val)=>setIsProfileModalOpen(val)} />
      }
      
        {/* profile info */}
        <div className="bg-white relative boxShadow rounded-lg mt-6 py-8 px-6 w-full flex flex-col sm:flex-row gap-16 justify-between">
          <div className="flex items-center flex-1 gap-8 md:border-r-2 border-gray-400 md:border-dashed ">
            {/* user profile */}
            <div className="w-24 h-24 sm:h-16 sm:w-16 md:w-20 md:h-20 lg:h-28 lg:w-28">
              <img
                className="h-full w-full rounded-full object-cover object-center gap-16"
                src={loggedUserInfo?.profileImage}
                alt="profile picture"
              />
            </div>
            {/* user bio */}
            <div className="">
              <h1 className="md:text-md text-sm font-semibold">{loggedUserInfo?.fullname}</h1>
              <div className="mt-1">
                <p className=" text-xs md:text-sm font-semibold capitalize text-[#908e9b]">{loggedUserInfo?.position}</p>
              </div>
            </div>
          </div>
          {/* user info */}
          <div className="w-full flex flex-col md:flex-row flex-[1.5] leading-9">
            <div className="w-full">
              <div className="flex items-center gap-24 md:gap-4">
                <p className="font-semibold w-24 text-sm lg:text-base">Phone:</p>
                <p className="text-blue-600 text-sm lg:text-base font-semibold w-full">{loggedUserInfo?.phone}</p>
              </div>
              <div className="flex items-center gap-24 md:gap-4 my-1">
                <p className="font-semibold w-24 text-sm lg:text-base">Email:</p>
                <p className="text-blue-600 font-semibold text-sm lg:text-base w-full">{loggedUserInfo?.email}</p>
              </div>
              <div className="flex items-center gap-24 md:gap-4">
                <p className="font-semibold w-24 text-sm lg:text-base">Username:</p>
                <p className="text-gray-400 font-semibold text-sm lg:text-base w-full">{loggedUserInfo?.username}</p>
              </div>
              <div className="flex items-center gap-24 md:gap-4 my-1">
                <p className="font-semibold w-24 text-sm lg:text-base">Full Name:</p>
                <p className="text-gray-400 font-semibold w-full text-sm lg:text-base">{loggedUserInfo?.fullname}</p>
              </div>

              <div className="flex items-center gap-24 md:gap-4">
                <p className="font-semibold w-24 text-sm lg:text-base">Address:</p>
                <p className="text-gray-400 font-semibold capitalize w-full text-sm lg:text-base">{loggedUserInfo?.address}</p>
              </div>
              <div className="flex items-center gap-24 md:gap-4 my-1">
                <p className="font-semibold w-24 text-sm lg:text-base">Gender:</p>
                <p className="text-gray-400 uppercase font-semibold w-full text-sm lg:text-base">{loggedUserInfo?.gender}</p>
              </div>
            </div>
            <div onClick={()=>setIsProfileModalOpen(true)} className="bg-[#EEEEEE] absolute top-24 left-20 sm:top-28 sm:left-16 lg:top-32 lg:left-24  cursor-pointer w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full">
              <AiOutlineEdit size={24} color="gray" />
            </div>
          </div>
        </div>
    </>
  );
}
