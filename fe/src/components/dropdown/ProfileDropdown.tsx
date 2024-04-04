import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";


type TProfileProps={
    isDropDownActive: boolean
    dropDownClose: (val:boolean)=>void
}
export default function ProfileDropdown({isDropDownActive, dropDownClose}:TProfileProps) {
    const navigate = useNavigate()

    const handleLogout = ()=>{
        dropDownClose(false)
        Cookies.remove("authToken")
        navigate("/")
    }
  return (
    <>
    {
        isDropDownActive && (
            <div className="w-36 h-24 absolute bg-white rounded-sm boxShadow3 top-14 right-4 md:top-[78px] md:right-12 z-30">
            <p onClick={()=>{
              dropDownClose(false)
              navigate("/profile")

            }} className="mt-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3 flex items-center gap-4">
              <BiSolidUser size={22} />
              <span>Profile</span>

              </p>
            <p onClick={handleLogout} className="mt-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3 flex items-center gap-4">
              <FiLogOut size={22} />
              <span>Logout</span>

              </p>
          </div>
    

        )
    }
    </>
  );
}
