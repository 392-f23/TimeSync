import "/freebusycalendar.css";
// import

gapi.client.calendars.freebusy
  .query({
    timeMin: datetime,
    timeMax: datetime,
    timeZone: string,
    groupExpansionMax: integer,
    calendarExpansionMax: integer,
    items: [
      {
        id: string,
      },
    ],
  })
  .then(
    function (response) {
      const busyInfo = response.result.calendars.primary;
      // Do something with the list of events
      console.log("Busy status: ", busyInfo.busy);
    },
    function (error) {
      console.error("Error fetching events: " + error.result.error.message);
    }
  );
