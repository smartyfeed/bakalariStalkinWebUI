<script>
  import { get, apiBase } from "$lib/global.js";

  var darkCenter = true;

  var userPromise = get("/user");
  userPromise.then(user => darkCenter = !!user.error);
</script>

<style>
  .darkCenter {
    background: var(--background-dark);
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20%;
  }

  .darkCenter div {
    background: var(--background-color);
    padding: 1em;
    width: 100%;
    height: 100%;
    border-radius: 1em;
  }
</style>

<div class:darkCenter>
  <div>
    {#await userPromise}
    	<p>loading</p>
    {:then user}
      {#if user.error == "E_BAD_SESSION_TOKEN"}
        <p>You are not logged in</p>
        <a rel="external" href="{apiBase}/auth">Sign in with Discord</a>
      {:else}
    	  <slot></slot>
      {/if}
    {:catch error}
    	<p style="color: red">Error:</p>
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>
