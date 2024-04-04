import { useAppSelector } from "../../hooks/reduxHooks";
import { UsePostRequest } from "../../hooks/usePostRequest";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";
import UploadWidget from "../uploadImage/uploadImage";

export default function ProfilePicture() {
  const { sendPostRequest, resData, error, isLoading } = UsePostRequest();
  const userInfo = useAppSelector((state) => state.userInfo.user);
  const userProfilePicture = useAppSelector(
    (state) => state.profilePicture.profilePicture
  );
  const [imagePreview, setImagePreview] = useState<
    Blob | MediaSource | undefined | string
  >(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setImagePreview(userInfo?.profileImage);
    }
  }, [userInfo]);

  useEffect(() => {
    if (resData?.status === 200) {
      dispatch(setUsers(resData.data.data));
      toast.success("profile picture updated");
    }
  }, [resData, error]);

  return (
    <>
      <form>
        {/* heading */}
        <div className="mt-10">
          <h1 className="text-center font-semibold text-md md:text-xl">
            Profile Information
          </h1>
        </div>

        {/* profile image */}
        <div className="flex justify-center mt-4">
          <div className="w-28 h-28 relative rounded-full overflow-hidden">
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src={userProfilePicture ? userProfilePicture : userInfo?.profileImage }
              alt="userProfile"
            />

            <label className="absolute bottom-1 text-white editProfile text-center w-full font-semibold">
              <UploadWidget />
            </label>
          </div>
        </div>
        {/* <div className="w-7 flex items-center justify-center h-7 bg-[#ff7444] text-white hover:bg-white hover:transition-all hover:ease-in-out hover:duration-300 hover:text-[#ff7444] hover:border hover:border-[#ff7444] rounded-full mx-auto mt-2">
          <button>
            <AiOutlineCheck size={24} />
          </button>
        </div> */}
      </form>
    </>
  );
}
