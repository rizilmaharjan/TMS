import { useEffect, useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import AssignedTask from "../components/assignedTasks/AssignedTask";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/features/tasks/taskSlice";
import { useAppSelector } from "../hooks/reduxHooks";
export default function AllTasks() {
  const dispatch = useDispatch()
  const { isLoading, resData, error, getData } = useGetRequest(
  );
  useEffect(()=>{
   getData("http://localhost:8000/api/v1/tasks/all/assigned-by")


  },[])

    // access all tasks data from taskSlice
    const allTasks = useAppSelector((state) => state.assignedTasks.tasks);

  // const [allTasks, setAllTasks] = useState<TaskSchema[] | null>(null);

  useEffect(() => {
    if (resData?.status === 200) {
      // setAllTasks(resData?.data.data);
      dispatch(setTasks(resData.data.data));

    }

  }, [resData, error]);
  return (
    <>
      {/* <div>
        {isLoading && <Loader />}
        {!isLoading &&
          allTasks &&
          allTasks.map((task) => (
            <div className="flex justify-around items-center py-3 mt-3 boxShadow3">
              <div className="w-72">
                <p className="text-sm text-[#908E9B] font-semibold">
                  Task Name
                </p>
                <p className="capitalize font-semibold">{task.title}</p>
              </div>
              <div className="w-40">
                <p className="text-sm text-[#908E9B] font-semibold">
                  Assigned To
                </p>
                <p className="capitalize font-semibold">{task.assignedTo}</p>
              </div>

              <div className="w-20">
                <p className="text-sm text-[#908E9B] font-semibold">Priority</p>
                <p
                  className={`uppercase font-semibold ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }  `}
                >
                  {task.priority}
                </p>
              </div>

              <div className="w-24">
                    <p className="text-sm text-[#908E9B] font-semibold">
                      Status
                    </p>
                    <p
                      className={`${
                        task.status === "pending"
                          ? "bg-yellow-300 text-yellow-700"
                          : "bg-green-400 text-green-700 font-semibold"
                      } opacity-80 px-2 capitalize w-full`}
                    >
                      {task.status}
                    </p>
                  </div>

                  <AiFillEye
                    // onClick={() => navigate(`/overview/${item._id}`)}
                    className="text-green-500 w-10 h-10 py-2 cursor-pointer rounded-full hover:text-white hover:bg-green-500"
                  />
            </div>
          ))}
      </div> */}

      <AssignedTask isLoading={isLoading} tasks={allTasks} />
    </>
  );
}
