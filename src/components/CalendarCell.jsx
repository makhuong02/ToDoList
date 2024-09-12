import React from "react";

function CalendarCell({
        value,
        isBlank = false,
        isSelected = false,
        isBusy = false,
        selectDate
    }) {

    return (
        <li className={(isBlank ? "blank-cell" : "calendar-cell") +
                        (isSelected ? " selected" : "") +
                        (isBusy ? " hightlight": "")}
            onClick={typeof(selectDate) === "function" ? () => selectDate(value) : () => {}}>
            {value}
        </li>
    )
}

export default CalendarCell;