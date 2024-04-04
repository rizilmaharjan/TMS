import { sidebarData } from "../datas/sidebarData";
import { FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import { TSidebarData } from "../datas/sidebarData";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

type TProps={
  showSidebar: boolean
  toggleSideBar: (value: React.SetStateAction<boolean>) => void
}
const Sidebar = ({showSidebar, toggleSideBar}:TProps) => {
  const [activeItem, setActiveItem] = useState<string>("overview");

  // useNavigate hook
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    navigate(`/${item}`);
    toggleSideBar(prev=>!prev)
  };

  return (
    <>
      <div className={`absolute z-20 md:static md:shadow-none bg-white shadow-2xl inset-y-0 transition-all duration-300 ease-in-out ${showSidebar ? "left-0 w-48" : "left-[-100%]"} md:left-0 md:w-[30%] md:py-5 md:px-4 lg:w-[20%]`  }>
          <div className="md:flex items-center gap-3 hidden">
            {/* book icon */}
            <div className="bg-blue-600 h-8 w-8 bottom-0 flex items-center justify-center rounded-lg">
              <FaBookOpen size={24} color="#fff" />
            </div>
            <h1 className="font-semibold text-2xl">Taskify</h1>
          </div>

          {/* sidebar options */}
          <ul className="mt-20 md:mt-10">
            {sidebarData.map((item) => (
              <NavLink key={item.id} to={`/${item.navigateTo}`}>
                {({ isActive }) => (
                  <li
                    key={item.id}
                    onClick={() => handleItemClick(item.navigateTo)}
                    className={`${isActive ? "bg-[#F5F5F7]":""} flex rounded-lg items-center capitalize gap-4 pl-6 py-2 mt-4 cursor-pointer hover:bg-[#F5F5F7] hover:font-semibold}`}
                  >
                    <item.icon
                      color={` ${
                        isActive ? "#000" : "#8E92BC"
                      }`}
                      size={22}
                    />
                    <span
                      className={`text-[#8E92BC] ${
                        isActive ? "text-black font-semibold"
                          : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
      </div>
    </>
  );
};

export default Sidebar;
