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

    // Filter by status
    if (status !== 'All') {
      filtered = filtered.filter((task) => task.status === status);
    }

    // Filter by search query (name or description)
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Tracker</h1>
      
      {/* Filter and Search Section */}
      <div className="mb-6 w-full max-w-sm flex flex-col gap-4">
        <Filter handleFilter={handleFilter} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Task List Section */}
      <div className="w-full max-w-4xl mb-8">
        <TaskList tasks={filteredTasks} />
      </div>

      {/* Task Form Section */}
      <div className="w-full max-w-lg">
        <TaskForm setTasks={setTasks} tasks={tasks} />
      </div>
    </div>
  );
};

export default App;
