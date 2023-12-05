import React, { useState, ChangeEvent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { Delete, PlaylistAddCheck, ListAlt, Done } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '70ch',
      '&:focus': {
        width: '70ch',
      },
    },
  },
  '& .MuiInputBase-root': {
    border: '1px solid #000',
    borderRadius: theme.shape.borderRadius,
    padding: '4px 12px',
  },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const TodoList = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr ',
  gridGap: 10,
  marginTop: theme.spacing(1),
  fontSize: 20,
}));

// ... (your existing imports)

const SearchAppBar: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');

      // Make a POST request to add the new todo item to the server
      fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo.text }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('New todo item added:', data);
        })
        .catch((error) => {
          console.error('Error adding todo item:', error);
        });
    }
  };

  const handleDeleteTodo = (id: number) => {
    console.log('Deleting todo with id:', id);

    // Make a DELETE request to remove the todo item from the server
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (response.ok) {
          // If deletion on the server is successful, update the state
          const updatedTodos = todos.filter((todo) => todo.id !== id);
          setTodos(updatedTodos);
          console.log('Todo item deleted successfully');
        } else {
          console.error('Failed to delete todo item');
        }
      })
      .catch((error) => {
        console.error('Error deleting todo item:', error);
      });
  };

  const handleDoneTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone, // Toggle the isDone property
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteDoneList = () => {
    // Make a DELETE request to remove all done todo items from the server
    fetch('http://localhost:3000/api/todos', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If deletion on the server is successful, update the state
          const updatedTodos = todos.filter((todo) => !todo.isDone);
          setTodos(updatedTodos);
          console.log('Done todo items deleted successfully');
        } else {
          console.error('Failed to delete done todo items');
        }
      })
      .catch((error) => {
        console.error('Error deleting done todo items:', error);
      });
  };

  const handleDeleteAll = () => {
    // Make a DELETE request to remove all todo items from the server
    fetch('http://localhost:3000/api/todos', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If deletion on the server is successful, update the state
          setTodos([]);
          console.log('All todo items deleted successfully');
        } else {
          console.error('Failed to delete all todo items');
        }
      })
      .catch((error) => {
        console.error('Error deleting all todo items:', error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ textAlign: 'center', flexGrow: 10, display: { xs: 'none', sm: 'block' } }}
          >
            To Do List
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="newTodo">
        <div>
          <Search>
            <StyledInputBase
              style={{ flex: 3, marginTop: '50px', padding: '60px' }}
              placeholder="Add New Todo"
              inputProps={{ 'aria-label': 'Add New Todo', value: inputValue, onChange: handleInputChange }}
            />
            <Button style={{ flex: 3 }} variant="contained" onClick={handleAddTodo} startIcon={<PlaylistAddCheck />}>
              Add
            </Button>
          </Search>
          <ButtonContainer>
            <Button style={{ flex: 3 }} variant="outlined" startIcon={<ListAlt />}>
              All
            </Button>
            <Button style={{ flex: 3 }} variant="outlined" startIcon={<ListAlt />}>
              Remaining List
            </Button>
            <Button style={{ flex: 3 }} variant="outlined" startIcon={<Done />}>
              Done List
            </Button>
          </ButtonContainer>
          
          <TodoList>
            <div>
              {todos.map((todo) => (
                <div  className='listtodo' key={todo.id}>
                  <div style={todo.isDone ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}>
                    {todo.text}
                  </div>
                  <div>
                    <Button variant="outlined" onClick={() => handleDoneTodo(todo.id)} startIcon={<Done />}>
                      Done
                    </Button>
                    <Button variant="outlined" startIcon={<Delete />} onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button style={{ flex: 3 }} variant="outlined" startIcon={<Delete />} onClick={handleDeleteDoneList}>
              Delete Done
            </Button>
            <Button style={{ flex: 3 }} variant="outlined" startIcon={<Delete />} onClick={handleDeleteAll}>
              Delete All
            </Button>
          </TodoList>
        </div>
      </div>
    </Box>
  );
}

export default SearchAppBar;
