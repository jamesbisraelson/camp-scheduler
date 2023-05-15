export class TimeSlot {
    // Class to handle a generic time slot. This can be an activity session, or just a time slot for a job
    constructor(startTime, endTime) {
        // Start time and end time should be passed in as strings representing 24 hour time (e.g., '12:30')
        this.startTime = startTime;
        this.endTime = endTime;
    }

    timeStringToDate(time) {
        // Pass in time as a string and return a Date object
        const timeArray = time.split(':');  // split date string into hours and minutes
        let date = new Date('2023-01-01');  // set dummy date so < can be used when detecting schedule conflicts
        date.setUTCHours(timeArray[0], timeArray[1], 0, 0);     // don't care about seconds and milliseconds, set them to 0
        return date;
    }

    detectConflict(otherTimeSlot) {
        // Detect scheduling conflict with other TimeSlot
        const thisStartTime = this.timeStringToDate(this.startTime)
        const otherStartTime = this.timeStringToDate(otherTimeSlot.startTime);
        const thisEndTime = this.timeStringToDate(this.endTime);
        const otherEndTime = this.timeStringToDate(otherTimeSlot.endTime);

        const startTimeConflicts = thisStartTime <= thisEndTime && thisStartTime >= otherStartTime;  // slot 1 starts during slot 2
        const endTimeConflicts = thisEndTime <= thisEndTime && thisEndTime >= otherStartTime;    // slot 1 ends during slot 2
        
        return startTimeConflicts || endTimeConflicts;

    }
}

// Tests to understand Date object
// let d = new Date('2023-02-10');
// d.setUTCHours(0,0,0,0);
// console.log(d);

// let date = TimeSlot.timeStringToDate('12:30');
// console.log(date.toTimeString());

// let date2 = TimeSlot.timeStringToDate('13:30');
// console.log(date < date2);
const timeSlot = new TimeSlot('12:30', '13:30');
console.log(timeSlot.detectConflict(new TimeSlot('13:12', '13:50')));