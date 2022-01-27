<script>
  import LoginPLZ from "$lib/LoginPLZ.svelte";
  import User from "$lib/User.svelte";
</script>

<style>
  .header {
    background: var(--background-dark);
    height: 3em;
    width: 100%;
    padding: 0.5em;
  }

  .content {
    margin-top: 0.5em;
    margin-left: 20%;
    margin-right: 20%;
  }
</style>

<LoginPLZ>
  <div class="header">
    <User />
  </div>
  <div class="content">
    <slot></slot>
  </div>
</LoginPLZ>
