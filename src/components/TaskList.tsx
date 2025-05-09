import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/viewdetails.css';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editDescription, setEditDescription] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:8080/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks", error));
  }, []);

  // Handle the edit button click
  const handleEdit = (task) => {
    setEditId(task.id);
    setEditDescription(task.description);
  };

  // Handle the delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      alert("Task deleted successfully!");
      setTasks(tasks.filter(task => task.id !== id)); // Remove from local state
    } catch (err) {
      console.error("Error deleting task", err);
      alert("Error deleting task");
    }
  };

  // Handle the form submission for editing a task
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tasks/${editId}`, { description: editDescription });
      alert("Task updated successfully!");
      setTasks(tasks.map(task => task.id === editId ? { ...task, description: editDescription } : task));
      setEditId(null); // Reset edit
      setEditDescription('');
    } catch (err) {
      console.error("Error updating task", err);
      alert("Error updating task");
    }
  };

  return (
    <div className="tasklist-container">
      <h2>View Details</h2>
      <br/>
      <br/>
      
      {/* Edit form */}
      {editId && (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => { setEditId(null); setEditDescription(''); }}>Cancel</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => handleEdit(task)} style={{ marginRight: '10px' }}>✏️</button>
                <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
