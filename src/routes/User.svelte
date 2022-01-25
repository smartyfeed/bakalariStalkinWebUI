<script>
  import { get } from  "../global.js";
  var userPromise = get("/user");
</script>

<style>

</style>

<div>
  {#await userPromise}
  	<p>loading</p>
  {:then user}
  	<p>{user.username}</p>
  {:catch error}
  	<p style="color: red">{error.message}</p>
  {/await}
</div>
