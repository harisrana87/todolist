import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());

// Import your Todo model
const TodoModel = require('./Model/userschema'); // Replace with your actual model path

// Connect to MongoDB
require('./Db/db.ts');

// Route to get all todos
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    // Fetch all todos from the database
    const todos = await TodoModel.find();

    // Send the todos as the response
    res.json(todos);
  } catch (error) {
    // Handle errors
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to add a new todo
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    // Create a new todo
    const newTodo = new TodoModel({ text });

    // Save the todo to the database
    const savedTodo = await newTodo.save();

    // Send the saved todo as the response
    res.status(201).json(savedTodo);
  } catch (error) {
    // Handle errors
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a todo
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Check if the todo exists
    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Delete the todo
    await TodoModel.findByIdAndDelete(todoId);

    // Send success response
    res.sendStatus(204);
  } catch (error) {
    // Handle errors
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete all todos
app.delete('/api/todos', async (req: Request, res: Response) => {
  try {
    // Delete all todos from the database
    await TodoModel.deleteMany();

    // Send success response
    res.sendStatus(204);
  } catch (error) {
    // Handle errors
    console.error('Error deleting todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});