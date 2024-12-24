import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div className="filter-container">
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default Filter;