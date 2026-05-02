import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function Profile({ user, onUpdate }) {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE}/users/profile`, form);
      onUpdate(res.data);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;