import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import EventForm from "./components/EventForm";
import Timetable from "./components/EventForm-chatgpt";
import { listUpcomingEvents, initGoogleApi, useAuthState } from ".";

const App = () => {
  const [user] = useAuthState(); // Get the current user's authentication state
  const [events, setEvents] = useState([]);
  const [isGoogleApiInitialized, setIsGoogleApiInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initGoogleApi()
      .then(() => setIsGoogleApiInitialized(true))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isGoogleApiInitialized && user) {
      // Check if the Google API is initialized and the user is signed in
      const fetchEvents = async () => {
        try {
          setIsLoading(true);
          const events = await listUpcomingEvents();
          setEvents(events);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvents();
    }
  }, [isGoogleApiInitialized, user]); // Run this effect when the Google API initialization status or user's sign-in status changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
      <Navigation />
      {/* <Timetable
          eventName="My Event Timetable"
          startDate="2023-10-18"
          endDate="2023-10-23"
          startTime="10:00 AM"
          endTime="5:00 PM"
          eventTableData={[]}
        /> */}
      <EventForm />
    </div>
  );
};

export default App;
