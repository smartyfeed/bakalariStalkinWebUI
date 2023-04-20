<script>
  import LoginPLZ from "$lib/LoginPLZ.svelte";
</script>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css");
</style>

<LoginPLZ>
  <div class="header">
    <slot></slot>
  </div>
</LoginPLZ>
