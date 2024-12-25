import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filter from './components/Filter';
import { fetchTasks } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks().then((res) => {
      setTasks(res.data);
    });
  }, [tasks]);

  useEffect(() => {
    let filtered = tasks;

    if (status !== 'All') {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [status, tasks, searchQuery]);

  const handleFilter = (status) => {
    setStatus(status);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-start p-10 gap-10">
      
      {/* Header */}
      <h1 className="text-5xl font-light font-extrabold text-gray-900 tracking-wide">
        Task Tracker
      </h1>

      {/* Filter and Search Section */}
      <div className="w-full max-w-lg flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-lg">
        <Filter handleFilter={handleFilter} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Task List Section */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <TaskList tasks={filteredTasks} />
      </div>

      {/* Task Form Section */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <TaskForm setTasks={setTasks} tasks={tasks} />
      </div>

    </div>
  );
};

export default App;
