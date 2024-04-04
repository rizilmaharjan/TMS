import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/features/user/userSlice";
import Loader from "../components/loader/SubmitLoader";
import useGetRequest from "../hooks/useGetRequest";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:8000");

const Layout = () => {
  // useDispatch hook from redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // hamburger menu
  const [showSidebar, setShowSidebar] = useState(false)

  // notifications
  const [notifications, setNotifications] = useState<string[]>([]);

  // custom get hook to fetch user info
  const {
    isLoading: userLoading,
    resData: userData,
    error: userError,
    getData,
  } = useGetRequest();

  useEffect(() => {
      getData("http://localhost:8000/api/v1/users/me");

  }, []);

  // useEffect to fetch the userInfo
  useEffect(() => {
    if (userLoading) {
      <Loader />;
    }
    if (userData?.status === 200) {
      dispatch(setUsers(userData.data.data));
      socket.emit("login", userData.data.data.username);
    }
  }, [userData, userError]);

  useEffect(() => {
    socket.on("getTask", (message) => {
      setNotifications((prev) => [...prev, message]);
    });
  }, [socket]);

  return (
    <>
      <div className="flex relative">
        <Sidebar toggleSideBar={(val)=>setShowSidebar(val)} showSidebar={showSidebar} />

        <div className="w-full bg-[#FAFAFA] h-screen">
          <Navbar
            toggleHamburger={(val)=>setShowSidebar(val)}
            showSidebar={showSidebar}
            notifications={notifications}
            setNotification={(val) => setNotifications(val)}
          />
          <div className="px-4 lg:px-12 mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
