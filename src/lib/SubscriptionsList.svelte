<script>
  import { get } from  "$lib/global.js";
  var listPromise = get("/list");
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr:not(:first-child) {
    border-top: 1px solid white;
  }
</style>

<div class="container">
  {#await listPromise}
  	<p>loading</p>
  {:then list}
    {#if list.length == 0}
      You have no subscriptions!
    {:else}
      <table>
        <tr>
          <th>Label</th>
          <th>Class</th>
          <th>Groups</th>
        </tr>
        {#each list as sub}
          <tr>
            <td>{sub.label}</td>
            <td>{sub.className}</td>
            <td>{sub.groups}</td>
          </tr>
        {/each}
      </table>
    {/if}
  {:catch error}
  	<p style="color: red">{error.message}</p>
  {/await}
</div>
