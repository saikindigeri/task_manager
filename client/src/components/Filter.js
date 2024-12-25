import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <select
        onChange={(e) => handleFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-md bg-white text-gray-800 shadow-md transition-all duration-300 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 hover:shadow-lg
                   appearance-none transform hover:scale-105 font-mono tracking-wide"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default Filter;
