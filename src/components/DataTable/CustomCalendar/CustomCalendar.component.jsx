import React, { useState } from "react";
import DatePicker from "react-datepicker";
import calendar from '../../../assets/images/calendar.jpg';
import "react-datepicker/dist/react-datepicker.css";
import './CustomCalendar.styles.scss';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomCalendar = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const onChange = dates => {
    const start = dates;
    setStartDate(start);
  };
  return (
    <div className="calendar-wrapper">
      <label className="calendar-header">Select Month:</label>
      <div className="calendar">
        {/* <label>
          <img className="calendar-img" src={calendar} /> */}
          <DatePicker
            onChange={onChange}
            selected={startDate}
            startDate={startDate}
            shouldCloseOnSelect={true}
            dateFormat="MMM-yyyy"
            showMonthYearPicker    
          />
        {/* </label> */}
      </div>
    </div>
  );
};

export default CustomCalendar;