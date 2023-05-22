<svelte:head>
  <title>Staff</title>
</svelte:head>

<script>
import { staffData, activitiesData, maintenanceData } from '/src/lib/stores.js';
  
  
  class StaffName {
    constructor(name, hasCertification, id) {
      this.name = name;
      this.hasCertification = hasCertification;
      this.id = id;
      
    }
  }

  let staff = $staffData || [new StaffName()];
  let count = 0;

  function deleteStaffName(name) {
    staff.splice(staff.indexOf(name), 1)
    staff = staff;
  }

  function addStaffName() {
   let newStaff = new StaffName( "", "", count);
    newStaff.id = count;
    count++;
    staff = [...staff, newStaff]
  }

  function saveData() {
    $staffData = staff;
    $staffData.filter(name => name.name && name.name !== "");
    console.log(staff);
  }




</script>

<main>
  <h1>Staff</h1>
  <form on:submit|preventDefault={saveData}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {#each staff as s}
        <div class='name-input'>
          <tr>
           
            <td><input on:change={saveData} bind:value={s.name}></td>
            <td><button on:click={() => deleteStaffName(s)}>x</button></td>
            {#if $activitiesData && $maintenanceData}
            <td><input bind:checked={s.hasCertification} on:change={saveData} type="checkbox"></td>
            {/if}
          </tr>
        </div>
          {#if s.hasCertification}
          <div class='certifications'>
          <tr class='activity-container'>
            <h3>Activities</h3>
            
              {#each $activitiesData as activity}
              <div class="activities">
                <input type="checkbox" name={activity}>
                <label for={activity}>{activity.name}</label>
              </div>
              {/each}
            
            </tr>
        

          <tr class='maintenance-container'>
            <h3>Maintenance</h3>
            {#each $maintenanceData as maintenance}
            <div class="maintenance">
              <input type="checkbox" name={maintenance}>
              <label for={maintenance}>{maintenance.name}</label>
            </div>
            {/each}
          </tr>
          </div>
          {/if}
          {/each}
            
      </tbody>
    </table>
    <button type="button" on:click={addStaffName}>Add</button>
  </form>
</main>

<style>
.certifications {
  margin-bottom: 2rem;
  display: flex;
}

.activity-container {
  display: flex;
  flex-direction: column;
}

.activities {
  display: flex;
}

.maintenance-container {
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
}

.maintenance {
  display: flex;
}

th {
  display: flex;
}



</style>