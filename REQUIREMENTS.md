Given a set of events, render the events on a single day calendar (similar to Outlook, Calendar.app, and Google Calendar). There are several properties of the layout:

1. No events may visually overlap.
2. If two events collide in time, they must have the same width.
3. An event should utilize the maximum width available, but constraint 2) takes precedence over this constraint.

Each event is represented by a JS object with a start and end attribute. The value of these attributes is the number of minutes since 9am. So {start:30, end:90) represents an event from 9:30am to 10:30am. The events should be rendered in a container that is 620px wide (600px + 10px padding on the left/right) and 720px (the day will end at 9pm). The styling of the events should match the attached screenshot.

You may structure your code however you like, but you must implement the following function in the global namespace. The function takes in an array of events and will lay out the events according to the above description.

function layOutDay(events) {}
This function will be invoked from the console for testing purposes. If it cannot be invoked, the submission will be rejected.

In your submission, please implement the calendar with the following input:

[ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];

A screenshot of the expected output is attached.
