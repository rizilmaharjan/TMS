import { TaskSchema } from "../../Model/task.schema";
import { formatDate } from "../../utils/dateConversion";
import Button from "../button/Button";
import { useLocation } from "react-router-dom";
import AssignTask from "../modal/AssignTask";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";

type TaskDescriptionProps = {
  taskDatas: TaskSchema | null;
  handleClick: (val: string) => void;
  handleDelete: (val: string) => void;
  handleEdit: (val: string) => void;
  assignTaskModal: boolean;
  setIsAssignTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleTaskData: React.Dispatch<React.SetStateAction<TaskSchema | null>>;
};
export default function TaskDescription({
  taskDatas,
  handleClick,
  handleDelete,
  handleEdit,
  assignTaskModal,
  setIsAssignTaskModalOpen,
  setSingleTaskData,
}: TaskDescriptionProps) {
  const { pathname } = useLocation();

  return (
    <>
      {assignTaskModal && (
        <AssignTask
          memberId={taskDatas?._id}
          taskDatas={taskDatas}
          setSingleTaskData={setSingleTaskData}
          assignTaskModal={assignTaskModal}
          closeModal={(val) => setIsAssignTaskModalOpen(val)}
        />
      )}
      <div className="mt-6 bg-white boxShadow h-[600px] py-4 rounded-lg px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-md font-semibold lg:text-3xl">Task Title</h1>
            <p className="capitalize text-sm md:text-xl mt-2 text-[#908e9b]">
              {taskDatas?.title}
            </p>
          </div>
          <div className="mt-[-40px]">
            {pathname.includes("/tasks") ? (
              <div className="flex items-center gap-10 w-fit mt-10">
                <div
                  onClick={() => {
                    if (taskDatas) {
                      handleEdit(taskDatas._id as string);
                    }
                  }}
                  className={`bg-green-500 font-semibold  w-10 h-10 flex items-center hover:text-green-600 hover:bg-white hover:border-2 hover:border-green-600 justify-center rounded-full cursor-pointer text-white ${
                    taskDatas?.status === "completed" ? "hidden" : "block"
                  }`}
                >
                  <AiFillEdit size={28} />
                </div>
                <div
                  onClick={() => {
                    if (taskDatas) {
                      handleDelete(taskDatas._id as string);
                    }
                  }}
                  className="bg-red-600 hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600 hover:transition-all hover:duration-300 hover:ease-in-out cursor-pointer font-semibold w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white"
                >
                  <AiFillDelete className="text-xl" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (taskDatas) {
                    handleClick(taskDatas._id as string);
                  }
                }}
                className="w-8 mt-6 h-8 md:h-10 md:w-10 cursor-pointer hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600 hover:transition-all hover:ease-in-out hover:duration-300 flex items-center justify-center px-3 font-semibold bg-green-600 rounded-full text-white"
              >
                  <AiOutlineCheck className="text-xl" />

              </div>
            )}
          </div>
        </div>
        <hr className="mt-3" />
        {/* task description section */}
        <div className="mt-4">
          <h1 className="lg:text-xl font-semibold text-md">Task Description</h1>
          <ol className="list-decimal ml-5 mt-2">
            {taskDatas?.description.map((description, index) => (
              <li className="capitalize my-1 text-xs md:text-base" key={index}>
                {description.step}
              </li>
            ))}
          </ol>
        </div>

        {/* informations */}

        <div className="flex items-center gap-14 leading-8 mt-8">
          <div className="w-48">
            <p className="text-sm">Due Date:</p>
            <p className="text-xs md:text-base">
              {taskDatas ? formatDate(taskDatas.dueDate) : null}
            </p>
          </div>
          <div className="w-48">
            <p className="text-sm">Created At:</p>
            <p className="text-xs md:text-base">
              {taskDatas ? formatDate(taskDatas.createdAt) : null}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-14 leading-8 my-4">
          <div className="w-48">
            <p className="text-sm">Assigned By:</p>
            <p className="capitalize text-xs md:text-base">
              {taskDatas?.assignedBy}
            </p>
          </div>
          <div className="w-48">
            <p className="text-sm">Assigned To:</p>
            <p className="capitalize text-xs md:text-base">
              {taskDatas?.assignedTo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-14 leading-8">
          <div className="w-48">
            <p className="text-sm">Priority</p>
            <p className="capitalize text-xs md:text-base">
              {taskDatas?.priority}
            </p>
          </div>
          <div className="w-48">
            <p className="text-sm">Status</p>
            <p className="capitalize text-xs md:text-base">
              {taskDatas?.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
