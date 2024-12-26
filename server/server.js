const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables
const app = express();
app.use(express.json());
app.use(cors());
 
// MongoDB Connection via Mongoose
const connectToDatabase = async () => {
  try {
    // Use the connection string from the .env file or fallback to local MongoDB
   // const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';
   
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://saikumardev018:saideva@cluster0.ngvpr.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB"); 
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the application if connection fails
  }
};

connectToDatabase();

// MongoDB Task Schema and Model
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
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
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
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the task' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
