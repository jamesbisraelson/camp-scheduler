<svelte:head>
  <title>Schedule</title>
</svelte:head>

<script>
	import { scheduleData, activitiesData } from "../../lib/stores";

  class ScheduleItem {
    constructor(activity) {
      this.activity = activity;
      this.sessions = [];
    }
  }

  let scheduleItems = $scheduleData || [new ScheduleItem];
	let columns = ["Activity"];
	let numSessions = 3;

	function deleteScheduleItem(scheduleItem) {
		scheduleItems.splice(scheduleItems.indexOf(scheduleItem), 1);
		scheduleItems = scheduleItems;
	}

	function addScheduleItem() {
		scheduleItems = [...scheduleItems, new ScheduleItem()];
	}

	function saveData() {
		$scheduleData = scheduleItems;
    $scheduleData.filter(scheduleItem => scheduleItem.activity && scheduleItem.sessions.length > 0);
	}

  function generateSchedule() {

  }
</script>

<main>
  <h1>Schedule</h1>
  {#if $activitiesData != null}
  <form on:submit|preventDefault={generateSchedule}>
    <div>
      <label for="numSessions">Number of Sessions</label>
      <input required type="number" name="numSessions" bind:value={numSessions}>
    </div>
    <table>
      <thead>
        <tr>
          {#each columns as column}
          <th>{column}</th>
          {/each}
          {#each Array(numSessions) as _, index}
          <th>{"Session " + (index + 1)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each scheduleItems as scheduleItem }
        <tr>
          <td>
            <select>
              {#each $activitiesData as activity}
              <option value={activity}>
                {activity.name}
              </option>
              {/each}
            </select>
          </td>
          {#each Array(numSessions) as _, index}
          <td><input on:change={saveData} bind:group={scheduleItem.sessions} value={index} type="checkbox"></td>
          {/each}
          <td><button on:click={() => deleteScheduleItem(scheduleItem)}>x</button></td>
        </tr>
        {/each}
      </tbody>
    </table>
    <button type="button" on:click={addScheduleItem}>Add</button>
    <button type="submit">Generate Schedule</button>
  </form>
  {:else}
  <p>Please create some activities first.</p>
  {/if}
</main>