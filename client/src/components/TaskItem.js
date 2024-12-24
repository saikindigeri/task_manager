import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api'; // Ensure updateTask uses PATCH

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState(task.description);
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState(task.status);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility

  
  // Delete Task
  const handleDelete = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(task._id); // Call delete API
     // Notify parent to update the task list
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error('Failed to delete the task', error);
      setIsModalOpen(false); // Close the modal even if the delete fails
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal if canceled
  };

  // Handle Edit Mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Update Task
  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      name: updatedTaskName,
      description: updatedTaskDescription,
      status: updatedTaskStatus,
    };

    console.log('Updated task:', updatedTask); // Log to check the updated task

    updateTask(task._id, updatedTask) // Send PATCH request to update the task
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
    <div className="task-item bg-white p-4 rounded-lg shadow-md mb-4">
      {alertMessage && (
        <div className="alert bg-green-500 text-white p-2 rounded-md mb-4">{alertMessage}</div>
      )}

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this task?</h3>
            <div className="modal-actions flex justify-between">
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="edit-form space-y-4">
          <input
            type="text"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Task Name"
          />
          <textarea
            value={updatedTaskDescription}
            onChange={(e) => setUpdatedTaskDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Task Description"
          />
          <select
            value={updatedTaskStatus}
            onChange={(e) => setUpdatedTaskStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-details space-y-4">
          <h3 className="text-xl font-semibold">{task.name}</h3>
          <p>{task.description}</p>
          <p className="text-gray-500">Status: {task.status}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
