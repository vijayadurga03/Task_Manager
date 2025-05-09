import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/tasklogin.css'


export default function Login() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/tasks", { description });
      alert("Submitted successfully!");
      setDescription("");
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Error submitting");
    }
  };

  const handleViewDetails = () => {
    navigate("/view");
  };

  return (
    <div className="logincenter">
      <form onSubmit={handleSubmit}>
        <h1>Task Manager Application</h1>
        <br />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <button type="submit">Submit</button>
        <br /><br />
        <button type="button" onClick={handleViewDetails}>View Details</button>
      </form>
    </div>
  );
}
