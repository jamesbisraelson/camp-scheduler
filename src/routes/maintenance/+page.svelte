<svelte:head>
  <title>Maintenance</title>
</svelte:head>

<script>
  import { maintenanceData } from '../../lib/stores.js';

  class MaintenanceJob {
    constructor(name, numStaff, startTime, endTime) {
      this.name = name;
      this.numStaff = numStaff;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }
  
  const columns = ["Job Name", "Number of Staff", "Start Time", "End Time"];   // columns for table
  let jobs = $maintenanceData || [new MaintenanceJob()];  // current possible jobs
  
  function saveMaintenanceData() {
    $maintenanceData = jobs;
  }
  
  function deleteJob(job) {
    // Remove job from array of jobs
    jobs.splice(jobs.indexOf(job), 1);
		jobs = jobs;  // force page to update immediately
  }
  
  function addJob() {
    // Add a new job to array of jobs
    jobs.push(new MaintenanceJob())
    jobs = jobs;  // force page to update immediately
  }
  

</script>

<main>
  <h1>Maintenance</h1>
  <form on:submit|preventDefault={saveMaintenanceData}>
    <table>
      <thead>
        <tr>
          {#each columns as column}
          <!--Create a column headers in table-->
            <th>{column}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each jobs as job}
          <!--Create a job input for every saved maintenance job-->
          <tr>
            <td><input on:change={saveMaintenanceData} required bind:value={job.name} type="text"></td>
            <td><input on:change={saveMaintenanceData} required bind:value={job.numStaff} type="number" min="0"></td>
            <td><input on:change={saveMaintenanceData} required bind:value={job.startTime} type="time"></td>
            <td><input on:change={saveMaintenanceData} required bind:value={job.endTime} type="time"></td>
            <td><button on:click={() => deleteJob(job)}>x</button></td>
          </tr>
        {/each}
        <!--Create button to add job to list of stored maintenance jobs-->
        <button on:click={addJob}>Add</button>
      </tbody>
    </table>
  </form>
</main>