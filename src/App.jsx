import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import EventForm from "./components/EventForm";
import { listUpcomingEvents } from ".";
import { initGoogleApi } from ".";

initGoogleApi();

const App = () => {
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await listUpcomingEvents();
      setEvents(events);
    };

    fetchEvents();
  });
  return (
    <div className="App">
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
      <Navigation />
      <EventForm />
    </div>
  );
};

export default App;
