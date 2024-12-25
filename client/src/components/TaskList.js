import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="task-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500 text-lg">No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
