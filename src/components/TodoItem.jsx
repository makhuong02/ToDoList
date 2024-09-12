import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
	return (
		<div className='item box' style={{background: todo.completed ? '#a1d6b2' : '#fff'}}>
		<div style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
			<p><strong>{todo.title}</strong></p>
			<p>{todo.task}</p>
		</div>

		
		<div className='button-container'>
			<input type="checkbox" onChange={() => toggleComplete(todo.id)} checked={todo.completed}/>
			<button onClick={() => deleteTodo(todo.id)}>
				<strong>DELETE</strong>
			</button>
		</div>
		</div>
	);
}

export default TodoItem;
