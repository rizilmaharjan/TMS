import { useEffect, useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import { TaskSchema } from "../Model/task.schema";
import AssignedTask from "../components/assignedTasks/AssignedTask";

export default function CompletedTasks() {
  const { isLoading, resData, error, getData } = useGetRequest(
    
  );
  useEffect(()=>{
      getData("http://localhost:8000/api/v1/tasks/completed/assigned-by")

  },[])

  const [completedTasks, setCompletedTasks] = useState<TaskSchema[]>([]);

  useEffect(() => {
    if (resData?.status === 200) {
      setCompletedTasks(resData?.data.data);
    }
  }, [resData, error]);
  return (
    <>
      {/* <div className="h-full">
        {isLoading && <Loader />}
        {completedTasks && completedTasks?.length > 0 ? (
          completedTasks.map((task) => (
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
                <p className="text-sm text-[#908E9B] font-semibold">Status</p>
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
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-semibold text-[#908e9b]">No Tasks Found</h1>
          </div>
        )}
      </div> */}
      <AssignedTask isLoading={isLoading} tasks={completedTasks} />
    </>
  );
}
