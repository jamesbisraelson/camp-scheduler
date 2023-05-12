<svelte:head>
  <title>Staff</title>
</svelte:head>

<script>
  import { staffData } from '/src/lib/stores.js';
  
  class StaffName {
    constructor(name) {
      this.name = name;
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
          <tr>
            <td><input on:change={saveData} bind:value={name.name}></td>
            <td><button on:click={() => deleteStaffName(name)}>x</button></td>
          </tr>
          {/each}
      </tbody>
    </table>
    <button type="button" on:click={addStaffName}>Add</button>
  </form>
</main>