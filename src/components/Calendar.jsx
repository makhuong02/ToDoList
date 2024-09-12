import React, { useEffect } from "react";
import CalendarCell from "./CalendarCell";

function Calendar({ date, setDate, selectedDate, selectDate, busyDays, loadData }) {
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	var [firstday, lastday] = getFirstAndLastDay();
	var [dayList, prevDay, nextDay] = getDayList();
	
	function getFirstAndLastDay() {
		let firstday = new Date(date);
		firstday.setDate(1);
		
		let lastday = new Date(firstday);
		lastday.setMonth(lastday.getMonth() + 1);
		lastday.setDate(0);

		return [firstday, lastday];
	}

	function getDayList() {
		// day of month
		let dayList = [];
		for (let i = 1; i <= lastday.getDate(); i++) {
			dayList.push(i);
		}
		
		// Add day of prev month
		let tempDay = new Date(firstday);
		let prevDay = [];
		while (tempDay.getDay() !== 1) {
			tempDay.setDate(tempDay.getDate() - 1);
			prevDay.unshift(tempDay.getDate());
		}


		// Add day of next month
		tempDay.setMonth(date.getMonth() + 1);
		tempDay.setDate(1);
		let nextDay = [];
		while (tempDay.getDay() !== 0) {
			nextDay.push(tempDay.getDate());
			tempDay.setDate(tempDay.getDate() + 1);
		}
		nextDay.push(tempDay.getDate());

		return [dayList, prevDay, nextDay];
	}

	function handlePrevMonth() {
		setDate(prevDate => {
			let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
			return newDate;
		});
	}

	function handleNextMonth() {
		setDate(prevDate => {
			let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
			return newDate;
		});
	}

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<div className="calendar">
			<div className="month">
				<ul>
					<li className="left-arrow" onClick={handlePrevMonth}>&#10094;</li>
					<li className="right-arrow" onClick={handleNextMonth}>&#10095;</li>
					<li>{monthName[date.getMonth()]} <br /> <span>{date.getFullYear()}</span></li>
				</ul>
			</div>

			<ul className="weekdays">
				{weekdays.map((value) => (
					<CalendarCell
						key={value}
						value={value}
					/>
				))}
			</ul>

			<ul className="days">
				{prevDay.map((value, index) => (
					<CalendarCell
					isBlank={true}
					key={index}
					value={value}
				/>
				))}
				{dayList.map((value, index) => (
					<CalendarCell
						key={index}
						value={value}
						isSelected={selectedDate.getDate() === value &&
									selectedDate.getMonth() === date.getMonth() &&
									selectedDate.getFullYear() === date.getFullYear()
									? true : false}
						isBusy={busyDays.includes(value)}
						selectDate={selectDate}
					/>
				))}
				{nextDay.map((value, index) => (
					<CalendarCell
					isBlank={true}
					key={index}
					value={value}
				/>
				))}
			</ul>
			
		</div>
	);
}

export default Calendar;