<script>
	import { enhance } from '$app/forms';
	import { get } from '$lib/global.js';
	var settingsPromise = get('/settings');

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

{#await settingsPromise}
	<p>loading</p>
{:then settings}
	{#if form?.success}
		<div class="alert alert-success" role="alert">Successfully saved!</div>
	{/if}
	{#if form?.error == 'E_BAD_BAKA_SERVER'}<div class="alert alert-danger" role="alert">
			Invalid/unsupported server address!
		</div>{/if}
	{#if form?.error == 'E_BAD_CLASS_NAME'}<div class="alert alert-danger" role="alert">
			Incorrect class name!
		</div>{/if}
	{#if form?.error == 'E_BAD_GROUPS'}<div class="alert alert-danger" role="alert">
			Invalid groups!
		</div>{/if}
	<h3>Personal defaults</h3>
	<form
		method="POST"
		use:enhance={({ form, data, action, cancel, submitter }) => {
			return async ({ result, update }) => {
        update({reset: false});
			};
		}}
	>
		<div class="mb-3">
			<label for="bakaServer" class="form-label">Bakaláři server address</label>
			<input
				type="text"
				class="form-control"
				id="bakaServer"
				name="bakaServer"
				placeholder="https://is.sssvt.cz/IS/"
				value={settings.bakaServer ?? ''}
			/>
		</div>
		<div class="mb-3">
			<label for="className" class="form-label">Your class</label>
			<input
				type="text"
				class="form-control"
				id="className"
				name="className"
				placeholder="P4.B"
				value={settings.className ?? ''}
			/>
		</div>
		<div class="mb-3">
			<label for="groups" class="form-label">Your groups</label>
			<input
				type="text"
				class="form-control"
				id="groups"
				name="groups"
				placeholder="1.sk, 2.sk... or leave empty for the whole class"
				value={settings.groups ? JSON.parse(settings.groups).join(', ') : ''}
			/>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
{/await}
