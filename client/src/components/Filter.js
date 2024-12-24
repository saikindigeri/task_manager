import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <select
        onChange={(e) => handleFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
