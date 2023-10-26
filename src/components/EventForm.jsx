
import React, { Component } from 'react';
import '../styles/EventForm.scss';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
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
    console.log("here")
    const eventData = {
      eventName: 'sdfg',
      startDate: '2023-10-04',
      endDate: '2023-10-11',
      startTime: '16:53',
      endTime: '16:53',
    };
    
    const { eventName, startDate, endDate, startTime, endTime } = eventData;

    // const { eventName, startDate, endDate, startTime, endTime } = this.state;

    const eventTableData = [];
    let currentHour = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(endDate + ' ' + endTime);

    while (currentHour <= endDateTime) {
      eventTableData.push({ date: currentHour.toDateString(), time: currentHour.toLocaleTimeString(), selected: false });
      currentHour.setHours(currentHour.getHours() + 1);
    }

    this.setState({ eventTableData });
  };

  handleTimeSlotClick = (index) => {
    const updatedEventTableData = [...this.state.eventTableData];
    updatedEventTableData[index].selected = !updatedEventTableData[index].selected;
    this.setState({ eventTableData: updatedEventTableData });
  };

  render() {
    const { eventName, startDate, endDate, startTime, endTime, eventTableData } = this.state;

    return (
      <div>
        <div>
        <h2>Create Event</h2>
        <form onSubmit={this.handleCreateEvent}>
          <label htmlFor="eventName">Event Name:</label>
          <input type="text" id="eventName" name="eventName" value={eventName} onChange={this.handleInputChange} required />

          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={startDate} onChange={this.handleInputChange} required />

          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={endDate} onChange={this.handleInputChange} required />

          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" value={startTime} onChange={this.handleInputChange} step="3600" required />

          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" value={endTime} onChange={this.handleInputChange} step="3600" required />

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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {eventTableData.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={slot.selected}
                        onChange={() => this.handleTimeSlotClick(index)}
                      />
                    </td>
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
