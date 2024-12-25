const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
 
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
  
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
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

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});


app.patch('/api/tasks/:id', async (req, res) => {
    const { name, description, status } = req.body;
    const taskId = req.params.id;
  
    // Validate the status
    if (status && !['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
  
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { name, description, status },
        { new: true, runValidators: true } // Ensure the task is returned after update
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(task); // Send the updated task in response
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the task' });
    }
  });
  




app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});
 
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))