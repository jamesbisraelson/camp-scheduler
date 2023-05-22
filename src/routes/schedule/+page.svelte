<svelte:head>
  <title>Schedule</title>
</svelte:head>

<script>

	import { scheduledActivitiesData, scheduledMaintenanceData, activitiesData, maintenanceData } from "../../lib/stores";

  class ScheduledActivity {
    constructor(activity) {
      this.activity = activity;
      this.sessions = [];
    }
  }


  class ScheduledMaintenanceJob {
    constructor(job, startTime, endTime) {
      this.job = job;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }

	let numSessions = 3;
  let scheduledActivities = $scheduledActivitiesData || [new ScheduledActivity()];
  let scheduledMaintenanceJobs = $scheduledMaintenanceData || [new ScheduledMaintenanceJob()];

	function deleteScheduledActivity(item) {
		scheduledActivities.splice(scheduledActivities.indexOf(item), 1);
    scheduledActivities = scheduledActivities;
    saveData();
	}

	function addScheduledActivity() {
		scheduledActivities = [...scheduledActivities, new ScheduledActivity()];
    saveData();
	}


  function deleteScheduledMaintenance(item) {
		scheduledMaintenanceJobs.splice(scheduledMaintenanceJobs.indexOf(item), 1);
    scheduledMaintenanceJobs = scheduledMaintenanceJobs;
    saveData();
	}

	function addScheduledMaintenance() {
		scheduledMaintenanceJobs = [...scheduledMaintenanceJobs, new ScheduledMaintenanceJob()];
    saveData();
	}

	function saveData() {
		$scheduledActivitiesData = scheduledActivities;
    $scheduledMaintenanceData = scheduledMaintenanceJobs;
  }

  function generateSchedule() {}
</script>

<main>
  <h1>Schedule</h1>
  <h2>Activity Schedule</h2>
  {#if $activitiesData != null && $activitiesData.length > 0}
  <form on:submit|preventDefault={generateSchedule}>
    <h3>Sessions</h3>
    <div>
      <label for="numSessions">Number of Sessions</label>
      <input required type="number" name="numSessions" bind:value={numSessions}>
    </div>
    <h3>Activities</h3>
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          {#each Array(numSessions) as _, index}
          <th>{"Session " + (index + 1)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each scheduledActivities as scheduledActivity }
        <tr>
          <td>
            <select bind:value={scheduledActivity.activity}>
              {#each $activitiesData as activity}
              <option value={activity}>
                {activity.name}
              </option>
              {/each}
            </select>
          </td>
          {#each Array(numSessions) as _, index}
          <td><input bind:group={scheduledActivity.sessions} value={index} type="checkbox"></td>
          {/each}
          <td><button on:click={() => deleteScheduledActivity(scheduledActivity)}>x</button></td>
        </tr>
        {/each}
      </tbody>
    </table>
    <button type="button" on:click={addScheduledActivity}>Add</button>
  </form>
  {:else}
  <p>Please create some activities first.</p>
  {/if}

  <h2>Maintenance Schedule</h2>
  {#if $maintenanceData != null && $maintenanceData.length > 0}
  <form on:submit|preventDefault={generateSchedule}>
    <h3>Jobs</h3>
    <table>
      <thead>
        <tr>
          <th>Job</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        {#each scheduledMaintenanceJobs as scheduledMaintenanceJob }
        <tr>
          <td>
            <select bind:value={scheduledMaintenanceJob.job}>
              {#each $maintenanceData as maintenance}
              <option value={maintenance}>
                {maintenance.name}
              </option>
              {/each}
            </select>
          </td>
          <td><input bind:value={scheduledMaintenanceJob.startTime} type="time" step="{60*5*3}"></td>
          <td><input bind:value={scheduledMaintenanceJob.endTime} type="time" step="{60*5*3}"></td>
          <td><button on:click={() => deleteScheduledMaintenance(scheduledMaintenanceJob)}>x</button></td>
        </tr>
        {/each}
      </tbody>
    </table>
    <button type="button" on:click={addScheduledMaintenance}>Add</button>
  </form>
  {:else}
  <p>Please create some maintenance jobs first.</p>
  {/if}
</main>