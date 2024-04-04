import { useAppSelector } from "../../hooks/reduxHooks";
import { AiOutlineBell } from "react-icons/ai";
import ProfileDropdown from "../dropdown/ProfileDropdown";
import { RefObject, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import { useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useRef } from "react";

type TNavProps = {
  notifications: string[];
  setNotification: React.Dispatch<React.SetStateAction<string[]>>;
  showSidebar: boolean;
  toggleHamburger: (value: React.SetStateAction<boolean>) => void;
};
const Navbar = ({
  notifications,
  setNotification,
  toggleHamburger,
  showSidebar,
}: TNavProps) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [isNotificationDropDownActive, setIsNotificationDropDownActive] =
    useState(false);
  const profiledropref: RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const notificaitondropref: RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state.userInfo.user);
  const toggleHamburgerMenu = () => {
    toggleHamburger((prev) => !prev);
  };

  useEffect(() => {
    let handler = (e: any) => {
      console.log("profiledropdown", profiledropref.current);
      console.log("etarget", e.target);
      if (!profiledropref.current?.contains(e.target)) {
        setIsDropDownActive(false);
      }
      if (!notificaitondropref.current?.contains(e.target)) {
        setIsNotificationDropDownActive(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <>
      <nav className="flex items-center justify-between px-6 lg:px-12 py-2 w-full relative">
        {showSidebar ? (
          <RxCross1
            onClick={toggleHamburgerMenu}
            className="text-2xl z-30 md:hidden font-semibold"
          />
        ) : (
          <GiHamburgerMenu
            onClick={toggleHamburgerMenu}
            className="text-2xl z-30 md:hidden"
          />
        )}
        {/* userInfo */}

        <div className=" md:block">
          <h1 className="font-semibold text-sm lg:text-2xl">
            Hi, {user?.fullname}
          </h1>
          <p className="text-gray-600 text-xs lg:text-base mt-1">
            Let's finish your task today!
          </p>
        </div>
        <div className="flex items-center gap-4 md:gap-0">
          {/* notification */}
          <div
            ref={notificaitondropref}
            className="w-14 h-14 md:w-28 flex items-center justify-center relative"
          >
            <AiOutlineBell
              className="cursor-pointer text-xl"
              onClick={() =>
                setIsNotificationDropDownActive(!isNotificationDropDownActive)
              }
            />
            {notifications.length > 0 && (
              <div className="h-5 w-5 bg-red-500 rounded-full absolute top-2 right-2 md:right-10">
                {
                  <p className="text-center text-white text-sm">
                    {notifications.length}
                  </p>
                }
              </div>
            )}
            {isNotificationDropDownActive && (
              <NotificationDropdown
                notifications={notifications}
                setNotification={setNotification}
                setNotificationDropDown={(val) =>
                  setIsNotificationDropDownActive(val)
                }
              />
            )}
          </div>
          <div ref={profiledropref}>
            {/* user profile */}
            <div
              onClick={() => setIsDropDownActive(!isDropDownActive)}
              className="h-9 w-9 md:w-14 md:h-14 rounded-full cursor-pointer"
            >
              <img
                className="w-full h-full rounded-full object-cover"
                src={user?.profileImage}
                alt="image"
              />
            </div>
            <ProfileDropdown
              isDropDownActive={isDropDownActive}
              dropDownClose={(val) => setIsDropDownActive(val)}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
