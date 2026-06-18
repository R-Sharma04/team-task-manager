import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function TaskForm({ onTaskAdded }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/tasks`, form);
      setForm({ title: '', description: '', status: 'pending' });
      onTaskAdded();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;