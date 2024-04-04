import { AiFillEye } from "react-icons/ai";
import Loader from "../loader/SubmitLoader";
import { TaskSchema } from "../../Model/task.schema";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type TAssignedTask = {
  isLoading: boolean;
  tasks: TaskSchema[] | null;
};

export default function AssignedTask({ isLoading, tasks }: TAssignedTask) {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  return (
    <>

        {isLoading && (
          <div className="h-[500px]">
            <Loader />
          </div>


        ) }
      <div>
        {tasks &&
          tasks.map((task) => (
            <div key={task._id} className="flex justify-around items-center py-3 mt-3 boxShadow3">
              <div className="w-32 md:w-64">
                <p className="text-xs text-[#908E9B] font-semibold">
                  Task Name
                </p>
                <p className="capitalize font-semibold text-sm md:text-base">{task.title}</p>
              </div>
              {/* <div className="w-40">
                <p className="text-sm text-[#908E9B] font-semibold">
                  Assigned To
                </p>
                <p className="capitalize font-semibold">{task.assignedTo}</p>
              </div> */}

              <div className="w-20">
                <p className="text-xs text-[#908E9B] font-semibold">Priority</p>
                <p
                  className={`uppercase font-semibold text-sm md:text-base ${
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

              <div className="w-24 hidden md:block">
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
                onClick={() => navigate(`${pathname}/${task._id}`)}
                className="text-green-500 w-10 h-10 py-2 cursor-pointer rounded-full hover:text-white hover:bg-green-500"
              />
            </div>
          ))}
      </div>
    </>
  );
}
