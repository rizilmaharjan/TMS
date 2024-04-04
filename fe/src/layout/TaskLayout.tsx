import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function TaskLayout() {
  return (
    <>
      <div className="bg-white h-[640px] px-2 md:px-8 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100">
        <div className="flex justify-between items-center">

        <h1 className="font-semibold hidden md:block lg:text-2xl">Tasks Assigned</h1>

        <nav className="flex justify-center gap-10 mt-7 mb-9">
          <NavLink to={"/tasks"} end>
            {({ isActive }) => (
              <span
                className={`${
                  isActive ? "underline" : "no-underline"
                } md:text-xl text-md font-semibold`}
              >
                All
              </span>
            )}
          </NavLink>
          <NavLink to={"/tasks/pending"}>
            {({ isActive }) => (
              <span
                className={`${
                  isActive ? "underline" : "no-underline"
                } md:text-xl text-md font-semibold`}
              >
                Pending
              </span>
            )}
          </NavLink>

          <NavLink to={"/tasks/completed"}>
            {({ isActive }) => (
              <span
                className={`${
                  isActive ? "underline" : "no-underline"
                } md:text-xl text-md font-semibold`}
              >
                Completed
              </span>
            )}
          </NavLink>
        </nav>
        </div>

        <Outlet />
      </div>
    </>
  );
}
