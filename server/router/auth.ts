import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

type TodoItem = {
  id: number;
  text: string;
};

let todoItemIdCounter = 1;
const todoItems: TodoItem[] = [];

// Get all todo items
app.get('/api/todos', (req: Request, res: Response) => {
  res.json(todoItems);
});

// Add a new todo item
// app.post('/api/todos', (req: Request, res: Response) => {
//   const { text } = req.body;
//   const newItem: TodoItem = { id: todoItemIdCounter++, text };
//   todoItems.push(newItem);
//   res.status(201).json(newItem);
// });

// // Delete a todo item
// app.delete('/api/todos/{:id}', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const index = todoItems.findIndex((item) => item.id === +id);
//   if (index === -1) {
//     return res.status(404).json({ message: 'Todo item not found' });
//   }
//   todoItems.splice(index, 1);
//   res.sendStatus(204);
// });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});