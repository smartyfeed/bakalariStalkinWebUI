<script>
  import { get, apiBase } from "$lib/global.js";

  var darkCenter = true;

  var userPromise = get("/user");
  userPromise.then(user => darkCenter = !!user.error);
</script>

<style>
  .loginPlz {
    background: var(--background-color);
    padding: 1em;
    border-radius: 1em;
  }

  img {
    height: 1em;
    padding: .5em;
    vertical-align: bottom;
  }

  .sign-in-text {
    vertical-align: top;
    padding-top: .5em;
    display: inline-block;
  }

  .content {
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
</style>

<div class="loginPlz">
  {#await userPromise}
  	<p>loading</p>
  {:then user}
    {#if user.error == "E_BAD_SESSION_TOKEN"}
      <p class="highlight">You are not logged in.</p>
      <a rel="external" href="{apiBase}/auth">
        <div class="btn">
          <img src="/image/discord-mark.svg" />
          <div class="sign-in-text">Sign in with Discord</div>
        </div>
      </a>
    {:else}
      <div class="content">
  	     <slot></slot>
       </div>
    {/if}
  {:catch error}
  	<p style="color: red">Error:</p>
  	<p style="color: red">{error.message}</p>
  {/await}
</div>
