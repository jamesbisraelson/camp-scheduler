<svelte:head>
  <title>Activities</title>
</svelte:head>

<script>
	import { activitiesData } from "/src/lib/stores.js";

	class Activity {
		constructor(name, numStaff) {
			this.name = name;
			this.numStaff = numStaff;
		}
	}

	let columns = ["Activity Name", "Number of Staff"];
	let activities = $activitiesData || [new Activity()];

	function deleteActivity(activity) {
		activities.splice(activities.indexOf(activity), 1);
		activities = activities;
	}

	function addActivity() {
		activities = [...activities, new Activity()];
	}

	function saveData() {
		$activitiesData = activities;
    $activitiesData.filter(activity => activity.name && activity.name !== "");
	}

</script>

<main>
  <h1>Activities</h1>
  <form on:submit|preventDefault={saveData}>
    <table>
      <thead>
        <tr>
          {#each columns as column}
          <th>{column}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each activities as activity}
          <tr>
            <td><input on:change={saveData} required bind:value={activity.name}></td>
            <td><input on:change={saveData} required bind:value={activity.numStaff} type="number"></td>
            <td><button on:click={() => deleteActivity(activity)}>x</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button type="button" on:click={addActivity}>Add</button>
  </form>
</main>