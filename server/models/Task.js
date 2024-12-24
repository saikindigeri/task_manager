const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
});

module.exports = mongoose.model('Task', taskSchema);
