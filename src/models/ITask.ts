export interface ITask {
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  projectId: string;
  assignedTo?: string;
}
