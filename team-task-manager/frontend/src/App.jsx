import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './config';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
const res = await axios.get(`${API_BASE}/api/users/profile`);      setUser(res.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      logout();
    }
  };

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentView('tasks');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentView('login');
  };

  if (!token) {
    return (
      <div className="app auth-page">
        {currentView === 'login' ? (
          <Login onLogin={login} onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
          <Register onRegister={login} onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="app-nav">
        <button onClick={() => setCurrentView('tasks')}>Tasks</button>
        <button onClick={() => setCurrentView('profile')}>Profile</button>
        <button onClick={logout}>Logout</button>
      </nav>
      <main className="page-content">
        {currentView === 'tasks' && (
          <>
            <TaskForm onTaskAdded={() => setCurrentView('tasks')} />
            <TaskList />
          </>
        )}
        {currentView === 'profile' && <Profile user={user} onUpdate={setUser} />}
      </main>
    </div>
  );
}

export default App;