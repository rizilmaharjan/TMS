import { FaTasks } from "react-icons/fa";
import { BsKanbanFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IconType } from "react-icons";

export type TSidebarData = {
  id: number;
  name: string;
  icon: IconType;
  navigateTo: string;
};

export const sidebarData: TSidebarData[] = [
  {
    id: 1,
    name: "overview",
    icon: BiSolidDashboard,
    navigateTo: "overview",
  },
  {
    id: 2,
    name: "kanban",
    icon: BsKanbanFill,
    navigateTo: "kanban",
  },
  {
    id: 3,
    name: "tasks",
    icon: FaTasks,
    navigateTo: "tasks",
  },
  {
    id: 4,
    name: "members",
    icon: FaUsers,
    navigateTo: "members",
  },
];
