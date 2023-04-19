<script>
  import {
    get
  } from "$lib/global.js";
  import Navbar from "./Navbar.svelte";

  var darkCenter = true;

  var userPromise = get("/user");
  userPromise.then(user => darkCenter = !!user.error);
</script>

<style>
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
</style>

<div class="loginPlz">
  {#await userPromise}
  	<p>loading</p>
  {:then user}
    {#if user.error == "E_BAD_SESSION_TOKEN"}
    <div class="header">
  	  <Navbar/>
    </div>
      <p class="highlight">You are not logged in.</p>
    {:else}
    <div class="header">
  	     <Navbar/>
    </div>
      <div class="content">
  	     <slot></slot>
       </div>
    {/if}
  {:catch error}
  	<p style="color: red">Error:</p>
  	<p style="color: red">{error.message}</p>
  {/await}
</div>