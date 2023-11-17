import React from 'react';

const Timetable = ({ eventName, startDate, endDate, startTime, endTime, eventTableData }) => {
  // Function to generate dates between start and end dates
  const generateDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Function to generate timetable cells for each hour within the time range
  const generateTimetableCells = () => {
    const dates = generateDates();
    const timetableCells = [];

    dates.forEach((date, dateIndex) => {
      const startTimeString = date + ' ' + startTime;
      const endTimeString = date + ' ' + endTime;

      let currentTime = new Date(startTimeString);
      
      while (currentTime <= new Date(endTimeString)) {
        timetableCells.push(
          <div key={`${dateIndex}-${currentTime.getHours()}`} className="timetable-cell">
            {date}, {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        );

        currentTime.setHours(currentTime.getHours() + 1);
      }
    });

    return timetableCells;
  };

  return (
    <div className="timetable">
      <h2>{eventName}</h2>
      <div className="timetable-header">
        <div>Date</div>
        <div>Time</div>
      </div>
      <div className="timetable-body">{generateTimetableCells()}</div>
    </div>
  );
};

export default Timetable;
