import { useParams } from "react-router-dom";
import useGetRequest from "../hooks/useGetRequest";
import { useEffect, useState } from "react";
import { UsePutRequest } from "../hooks/usePutRequest";
import { TaskSchema } from "../Model/task.schema";
import TaskDescription from "../components/taskDescription/TaskDescription";
import { UseDeleteRequest } from "../hooks/useDeleteRequest";
import { useAppSelector } from "../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
const IndividualTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    sendDeleteRequest,
    resData: removedData,
    error: removedError,
  } = UseDeleteRequest();

  // fetch single data
  const { isLoading, resData, error, getData } = useGetRequest(
    
  );

  useEffect(()=>{
    getData(`http://localhost:8000/api/v1/tasks/${id}`)

  },[])

  const allTasks = useAppSelector((state) => state.assignedTasks.tasks);

  // for sending the put request
  const {
    sendPutRequest,
    isLoading: updateLoading,
    resData: updateData,
    error: updateError,
  } = UsePutRequest();

  // store data
  const [singleTaskData, setSingleTaskData] = useState<TaskSchema | null>(null);

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);

  useEffect(() => {
    if (resData?.status === 200) {
      setSingleTaskData(resData.data.data);
    }
  }, [resData, error]);

  // mark as complete functionnality
  const handleTaskComplete = (id: string) => {
    const taskData = { ...singleTaskData, status: "completed" };
    sendPutRequest(`http://localhost:8000/api/v1/tasks/${id}`, taskData);
  };

  // delete task functionality for the one that assigned the task
  const handleTaskDelete = (id: string) => {
    sendDeleteRequest(` http://localhost:8000/api/v1/tasks/${id}`);
    setShouldNavigate(true);
  };
  // edit task functionality for the one that assigned the task
  const handleTaskEdit = (id: string) => {
    // sendPutRequest(`http://localhost:8000/api/v1/tasks/${id}`)
    setIsAssignTaskModalOpen(true);
  };

  const navigateToTasks = () => {
    navigate("/tasks");
  };

  useEffect(() => {
    if (removedData?.status === 200 && shouldNavigate) {
      const remainingTasks = allTasks.filter(
        (item) => item._id !== resData?.data.data._id
      );
      dispatch(setTasks(remainingTasks));
      navigateToTasks();
    }
  }, [removedData, removedError, shouldNavigate]);

  useEffect(() => {
    if (updateData?.status === 200) {
      setSingleTaskData((prev) => ({
        ...(prev as TaskSchema),
        status: "completed",
      }));
    }
  }, [updateData, updateError]);

  return (
    <>
      <TaskDescription
        assignTaskModal={isAssignTaskModalOpen}
        taskDatas={singleTaskData}
        handleEdit={(val) => handleTaskEdit(val)}
        setIsAssignTaskModalOpen={setIsAssignTaskModalOpen}
        handleDelete={(val) => handleTaskDelete(val)}
        handleClick={(val) => handleTaskComplete(val)}
        setSingleTaskData={setSingleTaskData}
      />
    </>
  );
};

export default IndividualTask;
