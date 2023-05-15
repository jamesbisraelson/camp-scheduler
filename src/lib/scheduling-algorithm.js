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

        const timeInInterval = (time, intervalStartTime, intervalEndTime) => {
            return time >= intervalStartTime && time <= intervalEndTime;    // return true if time falls within interval, otherwise false
        }

        const thisStartTimeConflicts = timeInInterval(thisStartTime, otherStartTime, otherEndTime);    // slot 1 starts during slot 2
        const thisEndTimeConflicts = timeInInterval(thisEndTime, otherStartTime, otherEndTime);    // slot 1 ends during slot 2
        const otherStartTimeConflicts = timeInInterval(otherStartTime, thisStartTime, thisEndTime); // slot 2 starts during slot 1
        const otherEndTimeConflicts = timeInInterval(otherEndTime, thisStartTime, thisEndTime); // slot 2 ends during slot 1
        
        return thisStartTimeConflicts || thisEndTimeConflicts || otherStartTimeConflicts || otherEndTimeConflicts;  // return false if any conflict, otherwise false
    }
}
