import React, { Component } from "react";
import "../styles/EventForm.scss";

// helper function to convert 0-23 int to 12-hour format
function convertTo12HourFormat(hour) {
  if (hour < 0 || hour > 23) {
    return "Invalid hour";
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const convertedHour = hour % 12 || 12; // Handle 0 as 12 in 12-hour format

  return `${convertedHour}:00 ${suffix}`;
}

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      eventTableData: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCreateEvent = (event) => {
    event.preventDefault();

    // testing purposes only
    // console.log("here")
    const eventData = {
      eventName: "sdfg",
      startDate: "2023-10-04",
      endDate: "2023-10-11",
      startTime: "16:53",
      endTime: "20:53",
    };

    const { eventName, startDate, endDate, startTime, endTime } = eventData;

    // comment ^^^ and uncomment vvv to test out input form
    // const { eventName, startDate, endDate, startTime, endTime } = this.state;

    // each row should be an hour
    // each col should be a day

    const eventTableData = [];
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
      const hourRow = [convertTo12HourFormat(currentHour)];

      // iterate over the week, incrementing day with each lop
      while (currentDateTime <= endDateTime) {

        // push date/hour cell 
        hourRow.push({
          date: currentDateTime.toDateString(),
          time: convertTo12HourFormat(currentHour),
          selected: false, // for checkbox
        })

        currentDateTime.setDate(currentDateTime.getDate() + 1);
      }
      
      eventTableData.push(hourRow);
      // update the start time to the next hour
      // e.g., 4:00 PM -> 5:00 PM
      startDateTime.setHours(startDateTime.getHours() + 1);
      // reset the date to the start date
      // e.g., 5:00 PM Wed Oct 11 2023 -> 5:00 PM Wed Oct 04 2023
      currentDateTime.setDate(startDateTime.getDate());
      currentHour += 1;
    }
    this.setState({ eventTableData });
  };

  // handles when a user clicks on a time slot at (dayIndex, timeIndex)
  // e.g. (0, 0) is the first time slot on Sunday
  handleTimeSlotClick = ({ timeIndex, dayIndex }) => {
    const updatedEventTableData = [...this.state.eventTableData];
    
    // prevents "undfined.selected" warning/error
    if (typeof this.state.eventTableData[timeIndex][dayIndex] !== 'string') {
      updatedEventTableData[timeIndex][dayIndex].selected = !updatedEventTableData[timeIndex][dayIndex].selected
    }
    this.setState({ eventTableData: updatedEventTableData });
    console.log("asdf", timeIndex, dayIndex)
  };

  render() {
    const {
      eventName,
      startDate,
      endDate,
      startTime,
      endTime,
      eventTableData,
    } = this.state;


    return (
      <div>
        
        <div>
          <h2>Create Event</h2>
          <form onSubmit={this.handleCreateEvent}>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={this.handleInputChange}
              step="3600"
              required
            />

            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={this.handleInputChange}
              step="3600"
              required
            />

            <input type="submit" value="Create Event" />
          </form>
        </div>
        <button onClick={this.handleCreateEvent}>testing purposes only</button>
        <div className='tables'>
          {eventTableData.length > 0 && (
            <div>
              <h2>Your availability</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    {/* render headings*/}
                    {eventTableData[0].map((array, index) => (
                      array.date !== undefined ? 
                        <th key={index}>{array.date}</th>
                      : null
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eventTableData.map((slot, timeIndex) => (
                    <tr key={timeIndex}>

                      {slot.map((day, dayIndex) => (

                        day.date !== undefined ? 
                          <td key={`${dayIndex}, ${timeIndex}`}>
                            <input
                              type="checkbox"
                              checked={slot.selected}
                              onChange={() => this.handleTimeSlotClick({timeIndex, dayIndex})}
                            /></td>
                            : <td>{day}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <h2>Group's availability</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {eventTableData.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EventForm;
