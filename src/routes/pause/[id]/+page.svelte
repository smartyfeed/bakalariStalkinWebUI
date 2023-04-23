<script>
// @ts-nocheck
	import { TempusDominus } from '@eonasdan/tempus-dominus';
	import { onMount } from 'svelte';
  
	/** @type {import('./$types').PageData} */
	export let data;

	onMount(async () => {
		new TempusDominus(document.getElementById('until'), {
			display: {
				icons: {
					time: 'bi bi-clock',
					date: 'bi bi-calendar',
					up: 'bi bi-arrow-up',
					down: 'bi bi-arrow-down',
					previous: 'bi bi-chevron-left',
					next: 'bi bi-chevron-right',
					today: 'bi bi-calendar-check',
					clear: 'bi bi-trash',
					close: 'bi bi-x'
				},
				buttons: {
					today: true
				},
				sideBySide: true
			},
			restrictions: {
				minDate: new Date(),
			}
		});
	});
</script>

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/@eonasdan/tempus-dominus@6.7.7/dist/css/tempus-dominus.min.css"
	crossorigin="anonymous"
/>

<div class="container half-width">
	{#if data.sub?.id}
		<h3>Pause subscription - {data.sub?.label}</h3>
	{:else}
		<h3>Pause all subscriptions</h3>
	{/if}
	<form method="POST">
		<input type="hidden" id="oldId" name="id" value={data.sub?.id || 'all'} />
		<div class="mb-3">
			<label for="until" class="form-label">Until</label>
			<input id="until" name="until" type="text" class="form-control" required />
		</div>
		<button type="submit" class="btn btn-warning">Pause</button>
	</form>
</div>
