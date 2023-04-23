# Alarm-Clock

This is a simple alarm clock made using vanilla JavaScript that allows you to set an alarm and delete or add alarms as needed.

## Usage

To use the alarm clock, simply open the index.html file in your browser. You will see a form where you can enter the time for your alarm.

To set an alarm, enter the desired time in the format HH:MM and click the "Add Alarm" button. The alarm will be added to the list of alarms below the form.

When the alarm rings, a message will be displayed on the screen and the alarm will automatically be removed from the list after 10 seconds.

To delete an alarm, simply click the "Delete" button next to the alarm in the list.

## Technical Details

The alarm clock is built using HTML, CSS, and vanilla JavaScript. It uses the `setInterval()` function to check the current time against the set alarm time and trigger the alarm when the two match.

The `setTimeout()` function is used to remove the alarm from the list after 10 seconds.

The list of alarms is stored in local storage, so it will persist even if you close and reopen the page.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
