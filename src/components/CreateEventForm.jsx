import './CreateEventForm.css'
const CreateEventForm = ({
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
    handleCreateEvent,
    handleInputChange,
  }) => (
    <div>
      {/* Enter the event dates and such */}
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={eventName}
          onChange={handleInputChange}
          required
        />
  
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          required
        />
  
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          required
        />
  
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={startTime}
          onChange={handleInputChange}
          step="3600"
          required
        />
  
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={handleInputChange}
          step="3600"
          required
        />
  
        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
  
  export default CreateEventForm;
  