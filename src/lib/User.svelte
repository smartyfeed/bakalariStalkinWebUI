<script>
  import { get, apiBase } from  "$lib/global.js";
  var userPromise = get("/user");
</script>
  {#await userPromise}
  	<p>loading</p>
  {:then user}
      {#if user.error == "E_BAD_SESSION_TOKEN"}
          <a rel="external" href="{apiBase}/auth" class="btn btn-discord">
              <i class="bi bi-discord"></i>
              <div class="sign-in-text">Sign in with Discord</div>
          </a>
      {:else}
        <div class="container-fluid">
          <img src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png?size=256" style="border-radius: 50%; height: 2.3em; padding-right: 0.5em;" alt="{user.username}'s avatar">
          {user.username}
        </div>
      {/if}
  {:catch error}
  	<p style="color: red">{error.message}</p>
  {/await}
