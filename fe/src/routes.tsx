import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import IndividualTask from "./pages/IndividualTask";
import Members from "./pages/Members";
import AllTasks from "./pages/AllTasks";
import PendingTasks from "./pages/PendingTasks";
import CompleteTasks from "./pages/CompleteTasks";
import UserProfile from "./pages/UserProfile";



export const mainLayoutRoutes = [
    {
        path: "/overview",
        element: <Dashboard />
    },
    {
        path: "/overview/:id",
        element: <IndividualTask />
    },
    {
        path: "/kanban",
        element: <Kanban />
    },
    {
        path: "/profile",
        element: <UserProfile />
    },
    {
        path: "/tasks/:id",
        element: <IndividualTask />
    },
    {
        path: "/tasks/pending/:id",
        element: <IndividualTask />
    },
    {
        path: "/tasks/completed/:id",
        element: <IndividualTask />
    },
    {
        path: "/members",
        element: <Members />
    },
]


export const taskLayoutRoutes=[
    {
        path: "/tasks",
        element: <AllTasks />
    },
    {
        path: "/tasks/pending",
        element: <PendingTasks />
    },
    {
        path: "/tasks/completed",
        element: <CompleteTasks />
    },
]
