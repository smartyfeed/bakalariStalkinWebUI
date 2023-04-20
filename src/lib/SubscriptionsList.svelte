<script>
  import { get } from "$lib/global.js";
  var listPromise = get("/list");
</script>

<div class="SubscriptionList">
  {#await listPromise}
    <p>loading</p>
  {:then list}
    {#if list.length == 0}
      <h3>Active Subscriptions</h3>
      You have no subscriptions!
    {:else}
      <h3>Active Subscriptions</h3>
      <table
        class="table table-striped table-hover table-bordered border-light-subtle"
      >
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Class</th>
            <th scope="col">Groups</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {#each list as sub}
            <tr>
              <td>{sub.label}</td>
              <td>{sub.className}</td>
              <td>{JSON.parse(sub.groups).join(", ")}</td>
              <td>
                <a href="/editSub/{sub.id}" class="btn btn-primary">Edit</a>
                <a href="/deleteSub/{sub.id}" class="btn btn-outline-danger">Delete</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
