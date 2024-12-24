import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filter from './components/Filter';
import { fetchTasks } from './api';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [status, setStatus] = useState('All');

  useEffect(() => {
    fetchTasks().then((res) => {
      setTasks(res.data);
      setFilteredTasks(res.data);
    });
  }, []);

  const handleFilter = (status) => {
    setStatus(status);
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>
      <Filter handleFilter={handleFilter} />
      <TaskList tasks={filteredTasks} />
      <TaskForm setTasks={setTasks} tasks={tasks} />
    </div>
  );
};

export default App;