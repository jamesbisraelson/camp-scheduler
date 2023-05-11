import { writable } from "svelte/store";

const testActivities = [
    {
        name: "Rock Wall",
        numStaff: 3
    },
    {
        name: "Zip Line",
        numStaff: 7
    },
    {
        name: "Beach Activities",
        numStaff: 4
    },
];

const testMaintenance = [
    {
        name: "Breakfast Dishes",
        numStaff: 4
    },
    {
        name: "Lunch Dishes",
        numStaff: 4
    },
    {
        name: "Supper Dishes",
        numStaff: 4
    },
];

export const activitiesData = writable(testActivities);
export const maintenanceData = writable(testMaintenance);
export const scheduledActivitiesData = writable(null);
export const scheduledMaintenanceData = writable(null);