import React, { useState } from "react";
import DatePicker from "react-datepicker";
import calendar from '../../../assets/images/calendar.jpg';
import "react-datepicker/dist/react-datepicker.css";
import './CustomCalendar.styles.scss';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomCalendar = ({ startDate, setStartDate, endDate, setEndDate }) => {

  return (
    <div className="calendar-wrapper">
      <label className="calendar-header">Select Range of Months:</label>
      <div className="calendar">
        <label>Start Month</label>
        <label>
          <img className="calendar-img" src={calendar} />
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            dateFormat="MMMM"
            showMonthYearPicker
          />
        </label>
      </div>
      <div className="calendar">
        <label>End Month</label>
        <label>
          <img className="calendar-img" src={calendar} />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM"
            showMonthYearPicker
          />
        </label>
      </div>
    </div>
  );
};

export default CustomCalendar;