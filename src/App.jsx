import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Header from './components/Header';
import Calendar from './components/Calendar';

function App() {
	const [todos, setTodos] = useState([]);
	const [date, setDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [busyDays, setBusyDays] = useState([]);

	const addTodo = (id, title, task) => {
		setTodos([...todos, { id, title, task, completed: false }]);
	};

	const toggleComplete = id => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/data/${id}`);
		} catch (err) {
			console.error(err);
		}

		setTodos(todos.filter(todo => todo.id !== id));
	};

	function selectDate(d) {
		setSelectedDate(new Date(date.getFullYear(), date.getMonth(), d));
	}

	const loadTaskByDate = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:5000/data/' + 
											`${date.getFullYear()}/` +
											`${date.getMonth() + 1}/` +
											`${selectedDate.getDate()}`);
			setTodos(response.data);
			
		} catch (err) {
			console.error('Error loading data:', err);
		}
	}, [date, selectedDate])

	useEffect(() => {
		loadTaskByDate();
	}, [selectedDate, loadTaskByDate])

	const loadData = useCallback(async () => {	
		try {
			const response = await axios.get(`http://localhost:5000/data/${date.getFullYear()}/${date.getMonth() + 1}`);
			var l = [];
			response.data.forEach(element => {
				let temp = new Date(element.date);
				l.push(temp.getDate());
			});
			setBusyDays(l);			
		} catch (err) {
			console.error('Error loading data:', err);
		}
	}, [date]);

	return (
		<div className="App">
			<Header/>
			<div className='main-container'>
				<Calendar 
					date={date} setDate={setDate}
					selectedDate={selectedDate} selectDate={selectDate}
					busyDays={busyDays}
					loadData={loadData}/>
				<div className='content'>
				<TodoForm addTodo={addTodo} selectedDate={selectedDate} loadData={loadData}/>
				<TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
				</div>
			</div>
		</div>
	);
}

export default App;
