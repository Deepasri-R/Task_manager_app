import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const path = window.location.pathname;
  const isDetailPage = path.startsWith("/tasks/") && path !== "/tasks";
  const taskId = isDetailPage ? path.split("/tasks/")[1].replace("/", "") : null;

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks/");
    setTasks(res.data);
  };

  const fetchTask = async (id) => {
    const res = await API.get(`/tasks/${id}/`);
    setTask(res.data);
    setTitle(res.data.title);
    setDescription(res.data.description);
  };

  useEffect(() => {
    if (isDetailPage && taskId) fetchTask(taskId);
    else fetchTasks();
  }, [isDetailPage, taskId]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");
    await API.post("/tasks/", { title, description, status: "pending" });
    setTitle(""); setDescription("");
    fetchTasks();
  };

  const toggleStatus = async () => {
    await API.put(`/tasks/${taskId}/`, {
      title,
      description,
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTask(taskId);
  };

  const updateTask = async () => {
    await API.put(`/tasks/${taskId}/`, {
      title,
      description,
      status: task.status,
    });
    alert("Task updated!");
    fetchTask(taskId);
  };

  const deleteTask = async () => {
    if (window.confirm("Delete this task?")) {
      await API.delete(`/tasks/${taskId}/`);
      window.location.href = "/tasks";
    }
  };

  if (isDetailPage) {
    if (!task) return <p>Loading task...</p>;
    return (
      <div className="app-container">
        <h1 className="app-title">🗂️ Task {task.id}</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <p><strong>Status:</strong> <span className={task.status}>{task.status}</span></p>
        <div className="detail-actions">
          <button onClick={toggleStatus}>{task.status === "pending" ? "Mark Completed ✅" : "Mark Pending ⏳"}</button>
          <button onClick={updateTask}>Save</button>
          <button className="danger" onClick={deleteTask}>Delete</button>
          <button className="back" onClick={() => (window.location.href = "/tasks")}>Back</button>
        </div>
      </div>
    );
  }

  // LIST PAGE
  return (
    <div className="app-container">
      <h1 className="app-title">🗂️ Task Manager</h1>
      <form className="task-form" onSubmit={addTask}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>

      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td className={t.status}>{t.status}</td>
              <td><a className="view-btn" href={`/tasks/${t.id}/`}>View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
