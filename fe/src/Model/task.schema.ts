export type TaskSchema = {
    _id: string;
    title: string;
    description: {
        step: string;
    }[];
    status: string;
    priority: string;
    dueDate: Date;
    assignedBy: string;
    assignedTo: string;
    createdAt: Date,

}