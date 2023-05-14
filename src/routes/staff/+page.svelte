<svelte:head>
  <title>Staff</title>
</svelte:head>

<script>
  import { staffData } from '/src/lib/stores.js';
  
  class StaffName {
    constructor(name, hasCertification) {
      this.name = name;
      this.hasCertification = hasCertification;
    }
  }

  let staff = $staffData || [new StaffName()];

  function deleteStaffName(name) {
    staff.splice(staff.indexOf(name), 1)
    staff = staff;
  }

  function addStaffName() {
    staff = [...staff, new StaffName()];
  }

  function saveData() {
    $staffData = staff;
    $staffData.filter(name => name.name && name.name !== "");
  }

 let display = false;
 const handleClick = () => display = !display;
  
  
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
        {#each staff as name}
        <div class='name-input'>
          <tr>
            <td><input on:change={saveData} bind:value={name.name}></td>
            <td><button on:click={() => deleteStaffName(name)}>x</button></td>
            <td><button id='block-button' bind={staff.hasCertification} on:change={saveData} on:click|self={handleClick}>></button></td>
          </tr>
        </div>
          {#if display}
          <div class='certifications'>
          
          <tr class='activity-block'>
            <h3>Activities</h3>
            <div>
              <td><input id='ropes-course' type='checkbox' name='ropes-course'>
                <label for="ropes-course">Challenge Course</label>
              </td>

              <td><input id='beach-activities' type='checkbox' name='beach-activities'>
                <label for="beach-activities">Beach Activities</label>
              </td>

              <td><input id='rock-wall' type='checkbox' name='rock-wall'>
                <label for="rock-wall">Rock Wall</label>
              </td>
            </div>

            <div>
              <td><input id='zipline' type='checkbox' name='zipline'>
                <label for="zipline">Zipline</label>
              </td>

              <td> <input id='zipline-breaker' type='checkbox' name='zipline-breaker'>
                <label for="zipline-breaker">Zipline Breaker</label>
             </td>

              <td><input id='canoe-kayak' type='checkbox' name='canoe-kayak'>
                <label for="canoe-kayak">Canoes and Kayaks</label>
              </td>
            </div>

            <div>
              <td><input id='field-games' type='checkbox' name='field-games'>
                <label for="field-games">Field Games</label>
              </td>

              <td><input id='archery' type='checkbox' name='archery'>
                <label for="archery">Archery</label>
              </td>

              <td><input id='pellet-guns' type='checkbox' name='pellet-guns'>
                <label for="pellet-guns">Pellet Guns</label>
              </td>

              <td><input id='slip-slide' type='checkbox' name='slip-slide'>
                <label for="slip-slide">Slip and Slide</label>
              </td>
            </div>
          </tr>
        

          <tr class='maintenance-block'>
            <h3>Maintenance</h3>
            <div>
              <td> <input type='checkbox' id='dishes' name='dishes'>
                <label for='dishes'>Dishes</label>
               </td>

              <td><input type='checkbox' id='cleaing-crew' name='cleaing-crew'>
                <label for='cleaing-crew'>Cleaning crew</label>
                </td>

              <td><input type='checkbox' id='parking' name='parking'>
                <label for='parking'>Parking</label>
                </td>

              <td><input type='checkbox' id='arrival-boats' name='arrival-boats'>
                <label for='arrival-boats'>Arrival Boats</label>
                </td>

              <td><input type='checkbox' id='departure-boats' name='departure-boats'>
                <label for='departure-boats'>Departure Boats</label>
                </td>

              <td><input type='checkbox' id='luggage' name='luggage'>
                <label for='luggage'>Luggage</label>
                </td>

              <td><input type='checkbox' id='family-camp-guide' name='family-camp-guide'>
                <label for='family-camp-guide'>Family Camp Guide</label>
                </td>
            </div>

            <div>
            <td><input type='checkbox' id='cabin-cleaning' name='cabin-cleaning'>
              <label for='cabin-cleaning'>Cabin Cleaning</label>
              </td>

            <td><input type='checkbox' id='campfire-lighting' name='campfire-lighting'>
              <label for='campfire-lighting'>Campfire Lighting</label>
              </td>

            <td><input type='checkbox' id='campfire-songs' name='campfire-songs'>
              <label for='campfire-songs'>Campfire Songs</label>
              </td>

            <td><input type='checkbox' id='evening-boats' name='evening-boats'>
              <label for='evening-boats'>Evening Boats</label>
              </td>

            <td><input type='checkbox' id='luc' name='luc'>
              <label for='luc'>Work with Lucas</label>
              </td>

            <td><input type='checkbox' id='dean' name='dean'>
              <label for='dean'>Work with Dean</label>
              </td>

            <td>
              <input type='checkbox' id='kitchen-aid' name='kitchen-aid'>
              <label for='kitchen-aid'>Kitchen Aid</label>
            </td>

             <td> 
              <input type='checkbox' id='big-game-help' name='big-game-help'>
              <label for='big-game-help'>Help with Big Game</label>
            </td>
             
              </div>

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

.activity-block div{
    display: flex;
    flex-direction: column;
  }

.maintenance-block div {
  display: flex;
  flex-direction: column;
}

.maintenance-block {
  margin-left: 4rem
}



</style>