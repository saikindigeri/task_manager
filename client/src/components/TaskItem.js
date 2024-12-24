import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api'; // Ensure updateTask uses PATCH

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState(task.description);
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState(task.status);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onDelete(task._id); // Notify parent to update the task list
    } catch (error) {
      console.error('Failed to delete the task', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      name: updatedTaskName,
      description: updatedTaskDescription,
      status: updatedTaskStatus,
    };
  
    console.log('Updated task:', updatedTask); // Log to check the updated task
  
    updateTask(task._id, updatedTask)  // Send PATCH request to update the task
      .then(response => {
        console.log('Response from update:', response); // Log the response from the backend
  
        // Notify parent to update the task list
  
  
        // Exit edit mode
        setIsEditing(false);
  
        // Show success message
        setAlertMessage('Task updated successfully!');
        setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
      })
      .catch(error => {
        console.error('Failed to update the task', error);
  
        // Show error message
        setAlertMessage('Failed to update the task!');
        setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
      });
  };
  
  return (
    <div className="task-item">
      {alertMessage && <div className="alert">{alertMessage}</div>}

      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <textarea
            value={updatedTaskDescription}
            onChange={(e) => setUpdatedTaskDescription(e.target.value)}
          />
          <select
            value={updatedTaskStatus}
            onChange={(e) => setUpdatedTaskStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
