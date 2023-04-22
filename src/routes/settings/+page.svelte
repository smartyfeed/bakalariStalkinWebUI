<script>
	import { enhance } from '$app/forms';
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

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
			update({ reset: false });
		};
	}}
>
	<input type="hidden" id="step" name="step" value={data.step} />
	<div class="mb-3">
		<label for="bakaServer" class="form-label">Bakaláři server address</label>
		<input
			type="text"
			class="form-control"
			id="bakaServer"
			name="bakaServer"
			value={data.settings.bakaServer ?? ''}
		/>
	</div>
	{#if data.step > 1 && !form?.error}
		<div class="mb-3">
			<label for="className" class="form-label">Your class</label>
			<select class="form-select" id="className" name="className">
				{#each data.classes as className}
					<option value={className.name} selected={className.name == data.settings.className}>
						{className.name}
					</option>
				{/each}
			</select>
		</div>
	{/if}
	{#if data.step > 2 && !form?.error}
		<div class="mb-3">
			<label for="groups" class="form-label">Your groups</label>
			<select class="form-select" id="groups" name="groups" multiple>
				{#if form?.data.inflow}
					<option value="">None</option>
					{#each data.groups as group}
						<option value={group}>{group}</option>
					{/each}
				{:else}
					<option value="" selected={data.settings.groups.length == 0}>None</option>
					{#each data.groups as group}
						<option value={group} selected={data.settings.groups.includes(group)}>{group}</option>
					{/each}
				{/if}
			</select>
		</div>
	{/if}
	<button type="submit" class="btn btn-primary"
		>{data.step >= 3 && !form?.error ? 'Submit' : 'Next'}</button
	>
</form>
