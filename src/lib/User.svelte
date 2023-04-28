<script>
  import { get, apiBase } from  "$lib/global.js";
  var userPromise = get("/user");
  var settingsPromise = get("/settings");
</script>
<style>
@media (max-width: 1199.98px) {
  .btn-discord {
    margin-left: 0.5em;
  }
}

.btn-discord {
  background-color: var(--blurple);
  color: #fff;
  display: flex;
  gap: 0.5em;
  max-width: 12.5rem;
}

.btn-discord:hover {
  background-color: #4953bd;
  color: #fff !important;
}
.btn-discord i {
  font-size: 1em;
}
</style>

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
          <img src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png?size=256" style="border-radius: 50%; height: 2.3em; margin-right: 0.5em;" alt="{user.username}'s avatar">
          {user.username} 
          <a href="{apiBase}/logout" class="btn btn-secondary" style="margin-bottom: 0.1em; margin-left: 1.5em" data-sveltekit-reload>Odhlásit se</a>
        </div>
      {/if}
  {:catch error}
  	<p style="color: red">{error.message}</p>
  {/await}

  <!-- svelte-ignore empty-block -->
  {#await settingsPromise}
  {/await}
