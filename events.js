exports.handler = async (event, context) => {
  const calendarId = process.env.CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  const timeMin = new Date().toISOString();
  const timeMax = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString();

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}` +
    `/events?singleEvents=true&orderBy=startTime&timeMin=${timeMin}&timeMax=${timeMax}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const events = (data.items || []).map(item => ({
      title: item.summary || "",
      start: item.start.dateTime || item.start.date || "",
      end: item.end?.dateTime || item.end?.date || "",
      location: item.location || "",
      description: item.description || ""
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(events)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load events" })
    };
  }
};
