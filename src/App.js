import React, { useState } from 'react';
import './App.css'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Header from './components/Header';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title, task) => {
    setTodos([...todos, { id: Date.now(), title, task, completed: false }]);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <Header/>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
