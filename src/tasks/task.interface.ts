export interface ITask {
  title: string;
  description: string;
  status: "todo" | "inProgress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: Date;
}

export interface IPartialTaskWithId extends Partial<ITask> {
  _id: string;
}
