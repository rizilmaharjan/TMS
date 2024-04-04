import { Draggable } from "react-beautiful-dnd";
import { TTaskSchema } from "../../Model/assignTask.schema";
type TProps = {
  title: string;
  _id: string;
  index: number;
  assignedBy: string;
  priority: string;
};
const SingleTask = ({ title, _id, index, assignedBy, priority }: TProps) => {
  return (
    <>
      <Draggable draggableId={_id} index={index}>
        {(provided) => (
          <div
            className="mt-4 bg-white border border-gray-300 py-3 px-2 capitalize rounded-md text-lg"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-xs md:text-base">{title}</p>
              <p className={`w-20 mt-4 hidden md:block text-center ${priority === "high" ? "text-red-500" : priority === "medium" ? "text-yellow-400" : "text-green-500"} font-semibold`}>{priority}</p>
            </div>
            <p className="hidden md:block">{assignedBy}</p>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default SingleTask;
