import React, { useState, useEffect, useCallback } from "react";
import "./first.css";
import Logout from "./logout";

export default function First() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  const fetchTasks = useCallback(async () => {
    if (!userEmail) return;

    try {
      const response = await fetch(`http://localhost:5000/tasks?email=${userEmail}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async () => {
    if (!taskTitle.trim() || !taskDesc.trim()) return;
    if (!userEmail) {
      alert("User email is missing. Please sign in again.");
      return;
    }

    try {
      const url = editTaskId ? `http://localhost:5000/updateTask/${editTaskId}` : "http://localhost:5000/addTask";
      const method = editTaskId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, task: taskTitle, desc: taskDesc }),
      });

      await response.json();
      fetchTasks(); 

      setTaskTitle("");
      setTaskDesc("");
      setEditTaskId(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/deleteTask/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskTitle(task.task);
    setTaskDesc(task.desc);
    setEditTaskId(task._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMarked = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed";

      await fetch(`https://iitt-backend.onrender.com/updatestatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <section id="todo-section">
      <div id="prof">
        <h1>Hi, {localStorage.getItem("name")}</h1>
        <Logout />
      </div>
      <hr />
      <div id="todo-cont">
        <h1>Add New Task Now!</h1>
        <input
          type="text"
          placeholder="Enter Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Task Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={!taskTitle.trim() || !taskDesc.trim()}>
          {editTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <hr />
      <div className="tasks-section">
        <h1>Your Tasks</h1>

        {tasks.map((task) => (
          <div key={task._id} className={`task ${task.status === "completed" ? "completed" : ""}`}>
            <h3>Your Task : {task.task}</h3>
            <p>Description : {task.desc}</p>
            <p>
              <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
            </p>
            <div id="todo-buttons">
              <button onClick={() => handleMarked(task._id, task.status)}>
                {task.status === "completed" ? "Undo Completion" : "Mark as Completed"}
              </button>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
