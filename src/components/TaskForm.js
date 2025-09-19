import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) {
      alert("Please enter a task title.");
      return;
    }
    onAdd({ title: t, description: description.trim(), status: "pending" });
    setTitle(""); setDescription("");
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <div className="inputs">
        <input
          className="input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <input
          className="input-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>
      <button className="btn primary" type="submit">Add Task</button>
    </form>
  );
}
