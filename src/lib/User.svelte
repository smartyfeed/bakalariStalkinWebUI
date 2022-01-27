<script>
  import { get } from  "$lib/global.js";
  var userPromise = get("/user");
</script>

<style>
  .container {
    height: 100%;
  }

  .avatar {
    height: 100%;
    display: inline-block;
    border-radius: 50%;
  }

  .username {
    display: inline-block;
    vertical-align: top;
  }
</style>

<div class="container">
  {#await userPromise}
  	<p>loading</p>
  {:then user}
    <img src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png?size=256" class="avatar" />
  	<p class="username">{user.username}</p>
  {:catch error}
  	<p style="color: red">{error.message}</p>
  {/await}
</div>
