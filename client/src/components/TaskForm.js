import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ setTasks, tasks }) => {
  const [formData, setFormData] = useState({ name: '', description: '', dueDate: '', priority: 'Low' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createTask(formData);
    setTasks([...tasks, newTask.data]);
    setFormData({ name: '', description: '', dueDate: '', priority: 'Low' }); // Clear form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-700">Add New Task</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Task Name</label>
        <input
          type="text"
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the task"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md shadow-md"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
