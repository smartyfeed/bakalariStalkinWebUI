<script>
  import { get } from  "$lib/global.js";
  var userPromise = get("/user");
</script>

<style>

</style>

<div>
  {#await userPromise}
  	<p>loading</p>
  {:then user}
    {#if user.error == "E_BAD_SESSION_TOKEN"}
      <p>You are not logged in</p>
      <a href="/api/auth">Sign in with Discord</a>
    {:else}
  	 <slot></slot>
    {/if}
  {:catch error}
  	<p style="color: red">Error:</p>
  	<p style="color: red">{error.message}</p>
  {/await}
</div>
