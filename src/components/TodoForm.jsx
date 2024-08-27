import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState({
    title: '',
    task: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (text.title.trim() && text.task.trim()) {
      addTodo(text.title, text.task);
      setText({
        title: '',
        task: ''
      });
    }
    else {
      alert("Empty title/task");
    }
    
  };

  function clearForm() {

  }

  return (
    <form className='box' onSubmit={handleSubmit}>
      <textarea className='title'
        type="text"
		value={text.title}
		onChange={e => setText(prevValue => {
      return {
        title: e.target.value,
        task: prevValue.task
      }
    })}
		placeholder='Title'
		/>

      <textarea className='task'
        type="text"
        value={text.task}
        onChange={e => setText(prevValue => {
          return {
            title: prevValue.title,
            task: e.target.value
          }
        })}
        placeholder="Add a new task"
      />

      <button type="submit">+</button>
    </form>
  );
}

export default TodoForm;
