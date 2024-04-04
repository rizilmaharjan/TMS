import { useEffect, useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import SingleTask from "../components/task/SingleTask";
import { UsePutRequest } from "../hooks/usePutRequest";
import { TaskSchema } from "../Model/task.schema";
const Kanban = () => {
  // custom hook to update
  const { sendPutRequest } = UsePutRequest();
  // to fetch penidng tasks
  const {
    resData: pendingData,
    error: pendingError,
    getData: getPendingDatas,
  } = useGetRequest();

  useEffect(() => {
    getPendingDatas("http://localhost:8000/api/v1/tasks/pending");
  }, []);
  // to fetch completed tasks
  const {
    resData: completedData,
    error: completedError,
    getData: getCompletedDatas,
  } = useGetRequest();

  useEffect(() => {
    getCompletedDatas("http://localhost:8000/api/v1/tasks/completed");
    console.log("completed kanban datas",completedData)
  }, []);

  const [pendingDatas, setPendingDatas] = useState<TaskSchema[]>([]);
  const [completedDatas, setCompletedDatas] = useState<TaskSchema[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // No valid destination

    const active = [...pendingDatas]; // Create a copy of the active todos list
    const complete = [...completedDatas]; // Create a copy of the completed todos list

    // Check if the source and destination are within the same column
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "pendingTasks") {
        // Reorder tasks within the "ToDo" column
        const [movedTask] = active.splice(source.index, 1);
        active.splice(destination.index, 0, movedTask);
      } else if (source.droppableId === "completedTasks") {
        // Reorder tasks within the "Completed" column
        const [movedTask] = complete.splice(source.index, 1);
        complete.splice(destination.index, 0, movedTask);
      }
    } else {
      // Tasks are moved between columns
      if (source.droppableId === "pendingTasks") {
        const [removedTodo] = active.splice(source.index, 1); // Remove the dragged todo from the source list
        complete.push(removedTodo); // Move the removedTodo to the complete list

        // send put request to update the task status in your database
        const updatedStatus = "completed";
        sendPutRequest(
          `http://localhost:8000/api/v1/tasks/${removedTodo._id}`,
          {
            status: updatedStatus,
          }
        );
        setPendingDatas(active);
        setCompletedDatas(complete);
      } else {
        const [removedTodo] = complete.splice(source.index, 1); // Remove the dragged todo from the source list
        active.splice(destination.index, 0, removedTodo); // Add the removedTodo to the active list

        const updatedStatus = "pending";
        sendPutRequest(
          `http://localhost:8000/api/v1/tasks/${removedTodo._id}`,
          {
            status: updatedStatus,
          }
        );
      }
    }

    setPendingDatas(active);
    setCompletedDatas(complete);
  };
  useEffect(() => {
    if (pendingData?.status === 200) {
      setPendingDatas(pendingData.data.task);
    }
  }, [pendingData, pendingError]);

  useEffect(() => {
    if (completedData?.status === 200) {
      setCompletedDatas(completedData.data.task);
    }
  }, [completedData, completedError]);
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-start gap-2 lg:gap-20 w-full">
          <Droppable droppableId="pendingTasks">
            {(provided) => (
              <div
                className="bg-white shadow-md h-[640px] w-2/3 lg:w-1/3 overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="h-2 bg-[#ebab7e]"></div>
                <div className="w-11/12 mx-auto mt-4">
                  <div className="leading-8">
                    <h1 className="text-sm md:text-2xl font-semibold text-center">
                      To Do
                    </h1>
                    <p className="text-center text-xs md:text-lg text-gray-400">
                      {pendingDatas?.length} cards
                    </p>
                  </div>
                  <div>
                    {pendingDatas?.map((item: TaskSchema, index: number) => (
                      <SingleTask index={index} {...item} key={item._id} />
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completedTasks">
            {(provided) => (
              <div
                className="bg-white shadow-md h-[640px] w-2/3 lg:w-1/3 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="h-2 bg-[#6486e8]"></div>

                <div className="w-11/12 mx-auto mt-4">
                  <div className="leading-8">
                    <h1 className="text-sm md:text-2xl font-semibold text-center">
                      Completed
                    </h1>
                    <p className="text-center text-xs md:text-lg text-gray-400">
                      {completedDatas?.length} cards
                    </p>
                  </div>
                  <div>
                    {completedDatas?.map((item: TaskSchema, index: number) => (
                      <SingleTask index={index} {...item} key={item._id} />
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default Kanban;
