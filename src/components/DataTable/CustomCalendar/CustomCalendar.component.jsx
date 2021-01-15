import React, { useState } from "react";
import DatePicker from "react-datepicker";
import calendar from '../../../assets/images/calendar.jpg';
import "react-datepicker/dist/react-datepicker.css";
import './CustomCalendar.styles.scss';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomCalendar = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="calendar-wrapper">
      <label className="calendar-header">Select Range of Months:</label>
      <div className="calendar">
        <label>
          <img className="calendar-img" src={calendar} />
          <DatePicker
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            showMonthYearPicker
          />
        </label>
      </div>
    </div>
  );
};

export default CustomCalendar;