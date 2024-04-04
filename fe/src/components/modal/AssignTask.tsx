import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { TTaskSchema, TaskSchema } from "../../Model/assignTask.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineMinus } from "react-icons/ai";
import { useAppSelector } from "../../hooks/reduxHooks";
import { UsePostRequest } from "../../hooks/usePostRequest";
import { TaskSchema as IndividualTaskSchema } from "../../Model/task.schema";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import Button from "../button/Button";
import { UsePutRequest } from "../../hooks/usePutRequest";
type TProps = {
  closeModal: (val: boolean) => void;
  memberId: string | undefined;
  assignTaskModal?: boolean;
  setSingleTaskData?: React.Dispatch<
    React.SetStateAction<IndividualTaskSchema | null>
  >;
  taskDatas?: IndividualTaskSchema | null;
};

const socket = io("http://localhost:8000");

const AssignTask = ({
  closeModal,
  memberId,
  assignTaskModal,
  setSingleTaskData,
  taskDatas,
}: TProps) => {
  // custom hook to post the task
  const { resData, error, setError, sendPostRequest } = UsePostRequest();

  const {
    resData: updatedData,
    error: updatedError,
    sendPutRequest,
  } = UsePutRequest();

  // redux useAppSelector to fetch the data
  const user = useAppSelector((state) => state.userInfo.user);

  const members = useAppSelector((state) => state.membersInfo.members);

  // stop closing the modal on clicking the form
  const handleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  // find user
  const IndividualUser = members.find((member) => member._id === memberId);

  // find task assigned to specific member
  // const specificTask = allTasks.find((task) => task._id === memberId);
  const defaultFormValues = assignTaskModal
    ? {
        title: taskDatas?.title || "",
        dueDate: taskDatas?.dueDate
          ? new Date(taskDatas.dueDate).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
        priority: taskDatas?.priority || "",
        status: taskDatas?.status || "pending",
        assignedBy: taskDatas?.assignedBy || "",
        assignedTo: taskDatas?.assignedTo || "",
        description: taskDatas?.description || [],
      }
    : {
        description: [{ step: "" }],
        assignedBy: user?.username || "",
        status: "pending",
        assignedTo: IndividualUser?.username || "",
      };

  useEffect(() => {
    if (assignTaskModal) {
      reset({ description: [] });
      taskDatas?.description.forEach((step) => {
        append({ step: step.step });
      });
    }
  }, [assignTaskModal, taskDatas]);

  // react hook form
  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<TTaskSchema>({
    resolver: zodResolver(TaskSchema),
    defaultValues: defaultFormValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "description",
    control,
  });

  const onSubmit: SubmitHandler<TTaskSchema> = (data) => {
    if (!assignTaskModal) {
      sendPostRequest("http://localhost:8000/api/v1/tasks", data);
    } else {
      sendPutRequest(
        `http://localhost:8000/api/v1/tasks/${taskDatas?._id}`,
        data
      );
    }
  };
  useEffect(() => {
    if (resData?.status === 201) {
      socket.emit("assignTask", {
        message: `task assigned by ${user?.username}`,
        assignedBy: user?.username,
        assignedTo: IndividualUser?.username,
      });
      toast.success("Task created successfully");

      reset();

      return;
    }

    if (error) {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage);
      setError(null);

      return;
    }
  }, [resData, error]);
  useEffect(() => {
    if (updatedData?.status === 200 && setSingleTaskData) {
      setSingleTaskData(updatedData?.data.data);

      reset({
        title: "",
        dueDate: "",
        priority: "",
        status: "pending",
        assignedBy: taskDatas?.assignedBy,
        assignedTo: taskDatas?.assignedTo,
        description: [{ step: "" }],
      });
      toast.success("Task updated successfully");

      return;
    }

    if (updatedError) {
      const errorMessage = (updatedError.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage);
      setError(null);

      return;
    }
  }, [updatedData, updatedError]);

  return (
    <>
      <div
        onClick={() => closeModal(false)}
        className="flex items-center justify-center h-screen fixed top-0 bottom-0 left-0  modalBackground w-full cursor-pointer z-30"
      >
        <div
          onClick={handleModal}
          className="bg-white w-[97%] md:w-[600px] h-[700px] overflow-y-auto pt-4 pb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100 rounded-lg "
        >
          <h1 className="text-center font-semibold text-lg md:text-2xl mb-8">
            Task Assignment Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-around">
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold">Task</label>
                <br />
                <input
                  className="border px-3 py-2 mt-2 rounded-md  w-full border-[#c4c4c4] outline-none"
                  autoComplete="off"
                  type="text"
                  {...register("title")}
                />
                {errors.title && (
                  <p className={"text-red-500"}>{errors.title?.message}</p>
                )}
              </div>
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold">Due Date</label>
                <br />
                <input
                  className="border px-3 py-2 mt-2 rounded-md  w-full border-[#c4c4c4] outline-none"
                  type="datetime-local"
                  {...register("dueDate", {
                    required: true
                  })}
                />
                {errors.dueDate && (
                  <p className={"text-red-500"}>{errors.dueDate.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-around mt-6">
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold relative bottom-[5px]">
                  Priority
                </label>
                <br />
                <select
                  className="border px-3 py-2 mt-2 rounded-md  w-full border-[#c4c4c4] outline-none"
                  {...register("priority")} // Use register here for validation
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                {errors.priority && (
                  <p className={"text-red-500"}>{errors.priority?.message}</p>
                )}
              </div>
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold">Status</label>
                <br />
                <input
                  readOnly
                  className="w-full px-3 py-2 mt-2 bg-gray-200"
                  type="text"
                  {...register("status")}
                />
                {errors.status && (
                  <p className={"text-red-500"}>{errors.status?.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-around mt-6">
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold">Assigned By</label>
                <br />
                <input
                  readOnly
                  className="bg-gray-200 w-full px-3 py-2 mt-2"
                  type="text"
                  {...register("assignedBy")}
                />
                {errors.assignedBy && (
                  <p className={"text-red-500"}>{errors.assignedBy?.message}</p>
                )}
              </div>
              <div className="w-44 sm:w-64 md:w-64">
                <label className="font-semibold">Assigned To</label>
                <br />
                <input
                  readOnly
                  className="bg-gray-200 w-full px-3 py-2 mt-2"
                  type="text"
                  {...register("assignedTo")}
                />
                {errors.assignedTo && (
                  <p className={"text-red-500"}>{errors.assignedTo?.message}</p>
                )}
              </div>
            </div>

            <div className="ml-2 sm:ml-12 sm:w-64 md:ml-5 mt-6">
              <label className="font-semibold">Description</label>
              <div>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        autoComplete="off"
                        className="border px-3 py-2 mt-2 rounded-md  w-64 border-[#c4c4c4] outline-none"
                        {...register(`description.${index}.step` as const)}
                      />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          <AiOutlineMinus size={24} color="red" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className="border w-24 h-10 mt-3 bg-[#e4e4e6] font-semibold text-black cursor-pointer"
                type="button"
                onClick={() => append({ step: "" })}
              >
                Add Field
              </button>
            </div>

            {/* submit button */}
            <div className="mt-4 ml-2 sm:ml-12 md:ml-5 h-10 bg-[#ff7444] text-white w-24">
              <Button isSubmitting={isSubmitting}>
                {assignTaskModal ? "Edit" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AssignTask;
