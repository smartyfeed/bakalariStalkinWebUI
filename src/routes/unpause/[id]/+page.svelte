<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(() => {
    window.location.replace("https://bakalari.smartyfeed.me");
	});
</script>
