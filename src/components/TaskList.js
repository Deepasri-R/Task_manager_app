import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <div className="empty">No tasks yet — add your first task above.</div>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
