<script>
  import {
    get
  } from "$lib/global.js";
  import Navbar from "./Navbar.svelte";

  var darkCenter = true;

  var userPromise = get("/user");
  userPromise.then(user => darkCenter = !!user.error);
</script>

  {#await userPromise}
  	<p>loading</p>
  {:then user}
    {#if user.error == "E_BAD_SESSION_TOKEN"}
    <div class="header">
  	  <Navbar/>
    </div>
    <div class="container pt-3">
      <p class="highlight">You are not logged in.</p>
    </div>
    {:else}
    <div class="header">
  	     <Navbar/>
    </div>
      <div class="container content">
  	     <slot></slot>
       </div>
    {/if}
  {:catch error}
  	<p style="color: red">Error:</p>
  	<p style="color: red">{error.message}</p>
  {/await}