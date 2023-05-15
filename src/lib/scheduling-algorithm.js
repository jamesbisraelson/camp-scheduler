export class TimeSlot {
    // Class to handle a generic time slot. This can be an activity session, or just a time slot for a job
    constructor(startTime, endTime) {
        // Start time and end time should be passed in as strings (e.g., '12:30')
        this.startTime = startTime;
        this.endTime = endTime;
        console.log(startTime);
    }

    timeStringToDate(time) {
        // Pass in time as a string and return a Date object
        const timeArray = time.split(':');  // split date string into hours and minutes
        let date = new Date();
        date.setUTCHours(timeArray[0], timeArray[1], 0, 0);     // don't care about seconds and milliseconds, set them to 0
        return date;
    }
}

// Tests to understand Date object
let d = new Date();
d.setUTCHours(0,0,0,0);
console.log(d);

let timeString = '12:30';
let timeArray = timeString.split(':');
let date = new Date();
date.setUTCHours(timeArray[0], timeArray[1], 0, 0);
console.log(date);