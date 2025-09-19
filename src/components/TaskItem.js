import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const save = () => {
    const t = title.trim();
    if (!t) return alert("Title cannot be empty.");
    onUpdate(task.id, { title: t, description: description.trim() });
    setEditing(false);
  };

  const toggle = () => {
    onUpdate(task.id, { status: task.status === "pending" ? "completed" : "pending" });
  };

  return (
    <div className={`task-item ${task.status === "completed" ? "done" : ""}`}>
      <div className="left">
        <button className="icon-btn" onClick={toggle} title="Toggle status">
          {task.status === "completed" ? "↺" : "✓"}
        </button>
      </div>

      <div className="center">
        {editing ? (
          <>
            <input className="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="edit-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
          </>
        ) : (
          <>
            <div className="task-title">{task.title}</div>
            <div className="task-desc">{task.description}</div>
            <div className="task-meta">Created: {new Date(task.created_at).toLocaleString()}</div>
          </>
        )}
      </div>

      <div className="right">
        {editing ? (
          <>
            <button className="btn small" onClick={save}>Save</button>
            <button className="btn small ghost" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn small danger" onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
