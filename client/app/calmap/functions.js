function getCalUrl(id, config) {
    var dateTime = new Date();
    // dateTime.setDate(d.getDate() - 1);
    dateTime.setHours(0,0,0,0);

    return 'https://www.googleapis.com/calendar/v3/calendars/'
        + id
        + '/events?'
        + 'orderBy=startTime&maxResults=10000&singleEvents=true&timeMin='
        + dateTime.toISOString()
        + '&key='
        + config.apiKeys.calendar;
}
