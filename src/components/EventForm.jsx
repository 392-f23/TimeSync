import React, { useState } from "react";
import CreateEventForm from "./CreateEventForm";
import "../styles/EventForm.scss";

function convertTo12HourFormat(hour) {
  if (hour < 0 || hour > 23) {
    return "Invalid hour";
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const convertedHour = hour % 12 || 12;

  return `${convertedHour}:00 ${suffix}`;
}

const EventForm = () => {
  const [state, setState] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    eventTableData: [],
  });

  const { eventName, startDate, endDate, startTime, endTime, eventTableData } =
    state;

    const handleSubmitCanMeetAvailability = () => {
      const { eventTableData } = state;
      console.log("HI!");
      console.log(eventTableData);
      const updatedEventTableData = eventTableData.map((slot) =>
        slot.map((day) => {
          if (day.selected) {
            return { ...day, count: (day.count || 0) + 1 };
          } else {
            return day;
          }
        })
      );
      setState({ ...state, eventTableData: updatedEventTableData });
    };
    
    const handleSubmitWouldRatherNotAvailability = () => {
      const { eventTableData } = state;
      const updatedEventTableData = eventTableData.map((slot) =>
        slot.map((day) => {
          if (day.selected) {
            return { ...day, count: (day.count || 0) + 0.5 };
          } else {
            return day;
          }
        })
      );
      setState({ ...state, eventTableData: updatedEventTableData });
    };
    
    const handleSubmitAvailability = () => {
      handleSubmitCanMeetAvailability();
      handleSubmitWouldRatherNotAvailability();
    };
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setState({ ...state, [name]: value });
    };
    
    const handleCreateEvent = (event) => {
      event.preventDefault();
      // testing purposes only
      // console.log("here")
      const eventData = {
        eventName: "sdfg",
        startDate: "2023-10-29",
        endDate: "2023-11-03",
        startTime: "08:53",
        endTime: "18:53",
      };

      // manual input
      const { eventName, startDate, endDate, startTime, endTime } = eventData;
    
      // testing-purposes skip form
      // const { eventName, startDate, endDate, startTime, endTime } = state;
    
      // each row should be an hour
      // each col should be a day
    
      const eventTable = [];
      let startDateTime = new Date(startDate + " " + startTime);
      let currentDateTime = new Date(startDate + " " + startTime);
      const endDateTime = new Date(endDate + " " + endTime);
    
      // these are represented as integers (i.e., 0-23)
      let currentHour = currentDateTime.getHours();
      let endHour = endDateTime.getHours();
    
      // Temporary fix to handle when startHour is endHour (e.g. 8 AM - 8 AM)
      // TODO: need a way to handle when startHour > endHour (e.g. 8 AM - 6 AM)
      if (currentHour === endHour) {
        currentHour = 0;
        endHour = 23;
      }
    
      // create table with hours as rows and days as columns
      // e.g.,
      // hourRow = ["4:00 PM", "Wed Oct 04 2023", "Thu Oct 05 2023", ...]
      // eventTableData = [hourRow4PM, hourRow5PM, ...]
    
      while (currentHour <= endHour) {
        console.log("startdate:", startDateTime);
        console.log(currentHour, endHour);
    
        const hourRow = [convertTo12HourFormat(currentHour)];
    
        // iterate over the week, incrementing day with each lop
        while (currentDateTime <= endDateTime) {
          console.log(currentHour);
          // push date/hour cell
          hourRow.push({
            date: currentDateTime.toDateString(),
            time: convertTo12HourFormat(currentHour),
            selected: false, // checkbox for user availibilty table
            count: 0, // count for group availability table
          });
    
          currentDateTime.setDate(currentDateTime.getDate() + 1);
        }
    
        eventTable.push(hourRow);
        // update the start time to the next hour
        // e.g., 4:00 PM -> 5:00 PM
        startDateTime.setHours(startDateTime.getHours() + 1);
        // reset the date to the start date
        // e.g., 5:00 PM Wed Oct 11 2023 -> 5:00 PM Wed Oct 04 2023
    
        currentDateTime.setMonth(startDateTime.getMonth());
        currentDateTime.setDate(startDateTime.getDate());
    
        currentHour += 1;
      }
      setState({ ...state, eventTableData: eventTable });
    };
    
    const handleTimeSlotClick = ({ timeIndex, dayIndex }) => {
      const updatedEventTableData = [...state.eventTableData];
      if (typeof state.eventTableData[timeIndex][dayIndex] !== "string") {
        updatedEventTableData[timeIndex][dayIndex].selected =
          !updatedEventTableData[timeIndex][dayIndex].selected;
      }
      setState({ ...state, eventTableData: updatedEventTableData });
    };

  return (
    <div>
      <CreateEventForm
        eventName={eventName}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        eventTableData={eventTableData}
      />
      <button onClick={handleCreateEvent}>testing purposes only</button>

      {/* result... */}
      <div className="tables">
        <div className="input-table">
          {eventTableData.length > 0 && (
            <div>
              <h2>Your "Can Meet" availability</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    {/* render heading*/}
                    {/* eventTableData is an array of hourRows */}
                    {/* hourRow = ["4:00 PM", "Oct 4", "Oct 5", ...] */}
                    {/* so array[0] is the hourRow time (e.g.) */}
                    {eventTableData[0].map((array, index) =>
                      array.date !== undefined ? (
                        <th key={index}>{array.date}</th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {eventTableData.map((slot, timeIndex) => (
                    <tr key={timeIndex}>
                      {slot.map((day, dayIndex) =>
                        day.date !== undefined ? (
                          <td key={`${dayIndex}, ${timeIndex}`}>
                            <input
                              type="checkbox"
                              checked={slot.selected}
                              onChange={() =>
                                handleTimeSlotClick({ timeIndex, dayIndex })
                              }
                            />
                          </td>
                        ) : (
                          <td>{day}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {eventTableData.length > 0 && (
            <div>
              <h2>Your "Would Rather Not Meet" availability</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    {/* render heading*/}
                    {/* eventTableData is an array of hourRows */}
                    {/* hourRow = ["4:00 PM", "Oct 4", "Oct 5", ...] */}
                    {/* so array[0] is the hourRow time (e.g.) */}
                    {eventTableData[0].map((array, index) =>
                      array.date !== undefined ? (
                        <th key={index}>{array.date}</th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {eventTableData.map((slot, timeIndex) => (
                    <tr key={timeIndex}>
                      {slot.map((day, dayIndex) =>
                        day.date !== undefined ? (
                          <td key={`${dayIndex}, ${timeIndex}`}>
                            <input
                              type="checkbox"
                              checked={slot.selected}
                              onChange={() =>
                                handleTimeSlotClick({ timeIndex, dayIndex })
                              }
                            />
                          </td>
                        ) : (
                          <td>{day}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* <div className="submit-availability-button"> */}
        {eventTableData.length > 0 && (
          <button
            onClick={handleSubmitAvailability}
            className="submit-availability-button"
          >
            Submit Availability
          </button>
        )}
        {/* </div> */}

        <div className="group-table">
          {eventTableData.length > 0 && (
            <div>
              <h2>Group's availability</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    {eventTableData[0].map((array, index) =>
                      array.date !== undefined ? (
                        <th key={index}>{array.date}</th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {eventTableData.map((slot, timeIndex) => (
                    <tr key={timeIndex}>
                      {slot.map((day, dayIndex) =>
                        day.date !== undefined ? (
                          <td key={`${dayIndex}, ${timeIndex}`}>{day.count}</td> // count of availability
                        ) : (
                          <td>{day}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
