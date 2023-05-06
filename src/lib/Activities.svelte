<script>
	import { activitiesData } from "../lib/stores";

	class Activity {
		constructor(name, numStaff) {
			this.name = name;
			this.numStaff = numStaff;
			this.sessions = [];
		}
	}

	let columns = ["Activity Name", "Number of Staff"];
	let numSessions = 3;
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
	}

</script>


<form on:submit|preventDefault={saveData}>
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
			{#each activities as activity}
				<tr>
					<td><input required bind:value={activity.name}></td>
					<td><input required bind:value={activity.numStaff} type="number"></td>
					{#each Array(numSessions) as _, index}
						<td><input bind:group={activity.sessions} value={index} type="checkbox"></td>
					{/each}
					<td><button on:click={() => deleteActivity(activity)}>x</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
	<button type="button" on:click={addActivity}>Add</button>
	<button type="submit">Save</button>
</form>