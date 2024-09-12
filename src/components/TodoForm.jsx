import React, { useState } from 'react';
import axios from 'axios';

function TodoForm({ addTodo, selectedDate, loadData }) {
	const [text, setText] = useState({
		title: '',
		task: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let id = Date.now();
		let title = text.title;
		let task = text.task;
		let dateStr = selectedDate.toISOString();

		if (title.trim() && task.trim()) {
			addTodo(id, title, task);
			setText({
				title: '',
				task: ''
			});
			try {
				await axios.post('http://localhost:5000/add', {
					id,
					title,
					task,
					dateStr
				});
				loadData();
			} catch(err) {
				console.error('Error loading data: ', err);	
			}
		}
		else {
			alert("Empty title/task");
		}
		
	};

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
