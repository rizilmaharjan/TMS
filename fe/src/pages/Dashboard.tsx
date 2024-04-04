import { useEffect, RefObject, useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import Loader from "../components/loader/SubmitLoader";
import { useNavigate } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { CgSortAz } from "react-icons/cg";
import { Category } from "../components/dropdown/Category";
import { Priority } from "../components/dropdown/Priority";
import { AiOutlineSearch, AiFillEye } from "react-icons/ai";
import { TaskSchema } from "../Model/task.schema";
import { debounce } from "lodash";
import { useRef } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

const Dashboard = () => {
  // useNavigate hook
  const navigate = useNavigate();

  const dropref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const priorityref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // usestate to store the tasks of the logged in user
  const [userTasks, setUserTasks] = useState<TaskSchema[] | null>(null);

  // user info
  const user = useAppSelector((state) => state.userInfo.user);

  // useState for sarch functionality
  const [searchTask, setSearchTask] = useState("");

  // category dropdown
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  // priority dropdown
  const [priorityDropdown, setPriorityDropDown] = useState(false);

  // category value
  const [categoryValue, setCategoryValue] = useState("");

  // priority value
  const [priorityValue, setPriorityValue] = useState("");

  // custom get hook to fetch the user's tasks
  const {
    isLoading: taskLoading,
    resData: taskData,
    error: taskError,
    getData,
  } = useGetRequest();

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      getData(
        `http://localhost:8000/api/v1/tasks?taskStatus=${categoryValue}&priority=${priorityValue}&searchQuery=${searchTask}`
      );
    }, 300);
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [categoryValue, priorityValue, searchTask]);
  // fetch user's tasks
  useEffect(() => {
    if (taskData?.status === 200) {
      setUserTasks(taskData?.data.task);
    }
  }, [taskData, taskError, categoryValue]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!dropref.current?.contains(e.target)) {
        setCategoryDropdown(false);
      }
      if (!priorityref.current?.contains(e.target)) {
        setPriorityDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

 
  return (
    <>
      <div className="bg-white pt-8 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100 h-[640px] lg:pr-6">
        {/* {taskLoading && <Loader />} */}
        <div>
          <div className="md:flex justify-between items-end px-5 gap-4 lg:w-9/12 lg:mx-auto">
            {/* search bar */}
            <div className="w-full lg:w-1/2">
              <h1 className="font-semibold text-md hidden md:block lg:text-2xl">
                Explore Task
              </h1>
              <div className="relative mt-4">
                <input
                  onChange={(e) => setSearchTask(e.target.value.trim())}
                  className="border-2 rounded-sm border-bg-[#f5f5f7] w-full py-3 pl-4 pr-12 outline-none"
                  type="text"
                  placeholder="Search Task"
                />
                <AiOutlineSearch
                  className="absolute right-5 top-[17px] text-gray-400"
                  size={22}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0 md:gap-4 mb-2 relative">
              {/* category */}
              <div ref={dropref}>
                <div
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className="flex items-center py-2 px-1 cursor-pointer font-semibold capitalize text-sm gap-4 border-2 border-[#f5f5f7] md:w-36 w-32 rounded-lg "
                >
                  <MdOutlineCategory size={22} color="#8e92bc" />
                  {categoryValue === "" ? "Status:" : ""}{" "}
                  {categoryValue === "" ? "All" : categoryValue}
                </div>
                {categoryDropdown && (
                  <Category
                    categoryDropdown={(val) => setCategoryDropdown(val)}
                    categoryValue={(val) => setCategoryValue(val)}
                    DropDown={categoryDropdown}
                  />
                )}
              </div>

              {/* sort by */}
              <div ref={priorityref}>
                <div
                  onClick={() => setPriorityDropDown(!priorityDropdown)}
                  className="flex cursor-pointer items-center py-2 px-1 gap-4 text-sm font-semibold capitalize border-2 border-[#f5f5f7] md:w-40 w-32 rounded-lg "
                >
                  <CgSortAz size={28} color="#8e92bc" />
                  {priorityValue === "" ? "Priority:" : ""}{" "}
                  {priorityValue === "" ? "All" : priorityValue}
                </div>
                {priorityDropdown && (
                  <Priority
                    priorityDropdown={(val) => setPriorityDropDown(val)}
                    priorityValue={(val) => setPriorityValue(val)}
                    DropDown={priorityDropdown}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* users tasks */}
        <div className="lg:ml-12 px-5 lg:px-0 mt-10">
          <h1 className="font-semibold text-md lg:text-2xl">Tasks</h1>
          {/* displays user's tasks */}
          <div>
            {userTasks && userTasks.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="font-semibold text-2xl text-gray-400">
                  No Tasks Found
                </p>
              </div>
            ) : (
              userTasks?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white flex justify-between items-center boxShadow3 px-3 md:px-6 py-3 mt-3"
                >
                  {/* task name */}
                  <div className="w-44">
                    <p className="text-sm text-[#908E9B] font-semibold">
                      Task Name
                    </p>
                    <p className="capitalize font-semibold text-sm md:text-base">
                      {item.title}
                    </p>
                  </div>

                  {/* task priority */}
                  <div className="w-24">
                    <p className="text-sm text-[#908E9B] font-semibold">
                      Priority
                    </p>
                    <p
                      className={`uppercase font-semibold text-sm md:text-base ${
                        item.priority === "high"
                          ? "text-red-500"
                          : item.priority === "medium"
                          ? "text-yellow-400"
                          : "text-green-500"
                      }  `}
                    >
                      {item.priority}
                    </p>
                  </div>

                  {/* task status */}
                  <div className="w-24 hidden md:block">
                    <p className="text-sm text-[#908E9B] font-semibold">
                      Status
                    </p>
                    <p
                      className={`${
                        item.status === "pending"
                          ? "bg-yellow-300 text-yellow-700"
                          : "bg-green-400 text-green-700 font-semibold"
                      } opacity-80 px-2 capitalize w-full`}
                    >
                      {item.status}
                    </p>
                  </div>

                  {/* view button */}
                  <AiFillEye
                    onClick={() => navigate(`/overview/${item._id}`)}
                    className="text-green-500 w-10 h-10 py-2 cursor-pointer rounded-full hover:text-white hover:bg-green-500"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
