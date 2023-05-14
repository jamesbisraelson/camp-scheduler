class TimeSlot {
    // Class to handle a generic time slot. This can be an activity session, or just a time slot for a job
    constructor(startTime, endTime) {
        // Start time and end time should be passed in as Date objects
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

var d = new Date();
d.setUTCHours(0,0,0,0);
console.log(d);
