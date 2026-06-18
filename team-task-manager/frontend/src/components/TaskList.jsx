import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (id, updates) => {
    try {
      await axios.put(`${API_BASE}/api/tasks/${id}`, updates);
      fetchTasks();
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      {error && <p className="error">{error}</p>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <select value={task.status} onChange={(e) => updateTask(task._id, { status: e.target.value })}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;