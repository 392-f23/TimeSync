import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EventForm from './components/EventForm';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <EventForm />
      {/* <h2>Create Event</h2>
      <form>
          <label for="eventName">Event Name:</label>
          <input type="text" id="eventName" name="eventName" required></input>

          <label for="eventDate">Start Date:</label>
          <input type="date" id="eventDate" name="eventDate" required></input>

          <label for="eventDate">End Date:</label>
          <input type="date" id="eventDate" name="eventDate" required></input>

          <label for="eventTime">Start Time:</label>
          <input type="time" id="eventTime" name="eventTime" required></input>

          <label for="eventTime">End Time:</label>
          <input type="time" id="eventTime" name="eventTime" required></input>

          <input type="submit" value="Create Event"></input>
      </form> */}
    
    </div>
  );
};

export default App;
