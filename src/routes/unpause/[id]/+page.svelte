<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(() => {
    window.location.replace("https://bakalari.smartyfeed.me");
	});
</script>

<div class="container half-width">
	{#if data.sub?.id}
		<h3>Pozastavit odběr - {data.sub?.label}</h3>
	{:else}
		<h3>Pozastavit všechny odběry</h3>
	{/if}
	<form method="POST">
		<input type="hidden" id="oldId" name="id" value={data.sub?.id || 'all'} />
		<div class="mb-3">
			<label for="until" class="form-label">Do</label>
			<input id="until" name="until" type="text" class="form-control" required />
		</div>
		<button type="submit" class="btn btn-warning">Pozastavit</button>
	</form>
</div>
