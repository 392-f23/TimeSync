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

    const handleEventFormChange = (event) => {
      const { name, value } = event.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmitAvailability = () => {
      const { eventTableData } = state;
      const updatedEventTableData = eventTableData.map((slot) =>
        slot.map((day) => {
          if (day.selected == "canMeet") {
            return { ...day, count: (day.count || 0) + 1 };
          }
          else if (day.selected == "wouldRatherNotMeet") {
              return { ...day, count: (day.count || 0) + 0.5 };
          } else {
            return day;
          }
        })
      );
      setState({ ...state, eventTableData: updatedEventTableData });
    };
    
    const handleCreateEvent = (event) => {
      event.preventDefault();
      // const eventData = {
      //   eventName: "CS392",
      //   startDate: "2023-10-29",
      //   endDate: "2023-11-03",
      //   startTime: "08:53",
      //   endTime: "18:53",
      // };

      // // testing-purposes skip form
      // const { eventName, startDate, endDate, startTime, endTime } = eventData;
    
      // manual input
      const { eventName, startDate, endDate, startTime, endTime } = state;
    
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
        // console.log("startdate:", startDateTime);
        // console.log(currentHour, endHour);
    
        const hourRow = [convertTo12HourFormat(currentHour)];
    
        // iterate over the week, incrementing day with each lop
        while (currentDateTime <= endDateTime) {
          // console.log(currentHour);
          // push date/hour cell
          hourRow.push({
            date: currentDateTime.toDateString(),
            time: convertTo12HourFormat(currentHour),
            selected: "none", // checkbox for user availibilty table
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
      if (updatedEventTableData[timeIndex][dayIndex].selected == "canMeet") {
        updatedEventTableData[timeIndex][dayIndex].selected = "none";
      } else {
        updatedEventTableData[timeIndex][dayIndex].selected = "canMeet";
      } 
        console.log("canMeet", updatedEventTableData[timeIndex][dayIndex].selected)
      setState({ ...state, eventTableData: updatedEventTableData });
    };

    const handleTimeSlotClickWouldRatherNotMeet = ({ timeIndex, dayIndex }) => {
      const updatedEventTableData = [...state.eventTableData];
      if (updatedEventTableData[timeIndex][dayIndex].selected == "wouldRatherNotMeet") {
        updatedEventTableData[timeIndex][dayIndex].selected = "none";
      } else {
        updatedEventTableData[timeIndex][dayIndex].selected = "wouldRatherNotMeet";
      } 
      console.log("wouldRatherNotMeet", updatedEventTableData[timeIndex][dayIndex].selected)
      setState({ ...state, eventTableData: updatedEventTableData });
    };


    // Populate tables with dummy data
    // How to use:
    // 1. Click "Import Data" button
    // 2. Table is now filled with dummy data
    // Clicking "export data" fills the console with a copyable data string
    // Replace "tableData" with that string, then "Import Data" will import that data instead.
    
    let tableData = [["8:00 AM",{"date":"Sun Oct 29 2023","time":"8:00 AM","selected":"none","count":0.5},{"date":"Mon Oct 30 2023","time":"8:00 AM","selected":"none","count":0.5},{"date":"Tue Oct 31 2023","time":"8:00 AM","selected":"none","count":0.5},{"date":"Wed Nov 01 2023","time":"8:00 AM","selected":"none","count":0.5},{"date":"Thu Nov 02 2023","time":"8:00 AM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"8:00 AM","selected":"none","count":0.5}],["9:00 AM",{"date":"Sun Oct 29 2023","time":"9:00 AM","selected":"none","count":0.5},{"date":"Mon Oct 30 2023","time":"9:00 AM","selected":"none","count":0.5},{"date":"Tue Oct 31 2023","time":"9:00 AM","selected":"none","count":0.5},{"date":"Wed Nov 01 2023","time":"9:00 AM","selected":"none","count":0.5},{"date":"Thu Nov 02 2023","time":"9:00 AM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"9:00 AM","selected":"none","count":0.5}],["10:00 AM",{"date":"Sun Oct 29 2023","time":"10:00 AM","selected":"none","count":0},{"date":"Mon Oct 30 2023","time":"10:00 AM","selected":"none","count":0},{"date":"Tue Oct 31 2023","time":"10:00 AM","selected":"none","count":0},{"date":"Wed Nov 01 2023","time":"10:00 AM","selected":"none","count":0},{"date":"Thu Nov 02 2023","time":"10:00 AM","selected":"none","count":0},{"date":"Fri Nov 03 2023","time":"10:00 AM","selected":"none","count":0.5}],["11:00 AM",{"date":"Sun Oct 29 2023","time":"11:00 AM","selected":"canMeet","count":2},{"date":"Mon Oct 30 2023","time":"11:00 AM","selected":"none","count":2},{"date":"Tue Oct 31 2023","time":"11:00 AM","selected":"none","count":2},{"date":"Wed Nov 01 2023","time":"11:00 AM","selected":"canMeet","count":3},{"date":"Thu Nov 02 2023","time":"11:00 AM","selected":"canMeet","count":3},{"date":"Fri Nov 03 2023","time":"11:00 AM","selected":"none","count":1}],["12:00 PM",{"date":"Sun Oct 29 2023","time":"12:00 PM","selected":"canMeet","count":2},{"date":"Mon Oct 30 2023","time":"12:00 PM","selected":"none","count":2},{"date":"Tue Oct 31 2023","time":"12:00 PM","selected":"none","count":2},{"date":"Wed Nov 01 2023","time":"12:00 PM","selected":"canMeet","count":3},{"date":"Thu Nov 02 2023","time":"12:00 PM","selected":"canMeet","count":3},{"date":"Fri Nov 03 2023","time":"12:00 PM","selected":"none","count":1.5}],["1:00 PM",{"date":"Sun Oct 29 2023","time":"1:00 PM","selected":"canMeet","count":2.5},{"date":"Mon Oct 30 2023","time":"1:00 PM","selected":"none","count":1.5},{"date":"Tue Oct 31 2023","time":"1:00 PM","selected":"none","count":2},{"date":"Wed Nov 01 2023","time":"1:00 PM","selected":"none","count":1},{"date":"Thu Nov 02 2023","time":"1:00 PM","selected":"wouldRatherNotMeet","count":2.5},{"date":"Fri Nov 03 2023","time":"1:00 PM","selected":"wouldRatherNotMeet","count":2}],["2:00 PM",{"date":"Sun Oct 29 2023","time":"2:00 PM","selected":"canMeet","count":3},{"date":"Mon Oct 30 2023","time":"2:00 PM","selected":"none","count":1},{"date":"Tue Oct 31 2023","time":"2:00 PM","selected":"none","count":0},{"date":"Wed Nov 01 2023","time":"2:00 PM","selected":"none","count":1},{"date":"Thu Nov 02 2023","time":"2:00 PM","selected":"none","count":1},{"date":"Fri Nov 03 2023","time":"2:00 PM","selected":"wouldRatherNotMeet","count":1}],["3:00 PM",{"date":"Sun Oct 29 2023","time":"3:00 PM","selected":"none","count":2},{"date":"Mon Oct 30 2023","time":"3:00 PM","selected":"none","count":0},{"date":"Tue Oct 31 2023","time":"3:00 PM","selected":"none","count":0},{"date":"Wed Nov 01 2023","time":"3:00 PM","selected":"none","count":1},{"date":"Thu Nov 02 2023","time":"3:00 PM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"3:00 PM","selected":"none","count":0}],["4:00 PM",{"date":"Sun Oct 29 2023","time":"4:00 PM","selected":"none","count":2},{"date":"Mon Oct 30 2023","time":"4:00 PM","selected":"none","count":0},{"date":"Tue Oct 31 2023","time":"4:00 PM","selected":"none","count":0},{"date":"Wed Nov 01 2023","time":"4:00 PM","selected":"none","count":0},{"date":"Thu Nov 02 2023","time":"4:00 PM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"4:00 PM","selected":"none","count":0}],["5:00 PM",{"date":"Sun Oct 29 2023","time":"5:00 PM","selected":"none","count":1.5},{"date":"Mon Oct 30 2023","time":"5:00 PM","selected":"none","count":0.5},{"date":"Tue Oct 31 2023","time":"5:00 PM","selected":"none","count":0.5},{"date":"Wed Nov 01 2023","time":"5:00 PM","selected":"none","count":0.5},{"date":"Thu Nov 02 2023","time":"5:00 PM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"5:00 PM","selected":"wouldRatherNotMeet","count":1.5}],["6:00 PM",{"date":"Sun Oct 29 2023","time":"6:00 PM","selected":"none","count":1.5},{"date":"Mon Oct 30 2023","time":"6:00 PM","selected":"none","count":0.5},{"date":"Tue Oct 31 2023","time":"6:00 PM","selected":"none","count":0.5},{"date":"Wed Nov 01 2023","time":"6:00 PM","selected":"none","count":0.5},{"date":"Thu Nov 02 2023","time":"6:00 PM","selected":"none","count":0.5},{"date":"Fri Nov 03 2023","time":"6:00 PM","selected":"wouldRatherNotMeet","count":1.5}]]
    
    // Testing function to export the table to console
    // note: find the button with id="exportData" 
    const exportData = () => {
      const jsonData = JSON.stringify(state.eventTableData);
      console.log(jsonData); 
      tableData = jsonData;
      return (
        <div>
          <h2>Exported Data</h2>
          <p>{jsonData}</p>
        </div>
      );
    };

    const importData = (data) => {
        setState({ ...state, eventTableData: data });
    };
    

  return (
    <div>
      <CreateEventForm
        eventName={eventName}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        handleInputChange={handleEventFormChange}
        handleCreateEvent={handleCreateEvent}
      />
      <h2>Join Event</h2>
      <form id="myForm">
        <label for="name">Enter unique event code:</label>
        <input type="text" id="name" name="name" />
    </form>
      <button onClick={() => importData(tableData)}>Join Event</button>

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
                              // checked={slot.selected == "canMeet"}
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
                              // checked={slot.selected == "wouldRatherNotMeet"}
                              // checked={console.log(slot.selected)}
                              onChange={() =>
                                handleTimeSlotClickWouldRatherNotMeet({ timeIndex, dayIndex })
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
      </div>
      <div className="tables">
        <div className="submit-availability-button">
          {eventTableData.length > 0 && (
            <button
              onClick={handleSubmitAvailability}
              className="submit-availability-button"
            >
              Submit Availability
            </button>
          )}
        </div>
        </div>
        <div className="tables">
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
