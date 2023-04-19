<script>
  import { page } from '$app/stores';
  import User from '$lib/User.svelte';
  import { get } from  "$lib/global.js";
  var userPromise = get("/user");
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary navbar py-3">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">LMIHAS Web UI</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname==='/'} sveltekit:prefetch href="/">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://absence.smartyfeed.me" target="_blank">Absence</a>
        </li>
        {#await userPromise}
        <!-- svelte-ignore empty-block -->
        {:then user}
        <!-- svelte-ignore empty-block -->
        {#if user.error == "E_BAD_SESSION_TOKEN"}
        {:else}
        <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname==='/settings'} href="/settings">Settings</a>
        </li>
        {/if}
        {/await}
        <li class="nav-item user">
          <User/>
        </li>
      </ul>
    </div>
  </div>
</nav>