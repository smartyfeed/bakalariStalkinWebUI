<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="container half-width">
	{#if form?.error == 'E_BAD_BAKA_SERVER'}<div class="alert alert-danger" role="alert">
			Invalid/unsupported server address!
		</div>{/if}
	{#if form?.error == 'E_BAD_CLASS_NAME'}<div class="alert alert-danger" role="alert">
			Incorrect class name!
		</div>{/if}
	{#if form?.error == 'E_BAD_GROUPS'}<div class="alert alert-danger" role="alert">
			Invalid groups!
		</div>{/if}
	<h3>Edit defaults</h3>
	<form
		method="POST"
		use:enhance={({ form, data, action, cancel, submitter }) => {
			if (submitter.id == 'back') {
				data.set('step', (parseInt(data.get('step')) - 2).toString());
			}
			return async ({ result, update }) => {
				update({ reset: false });
			};
		}}
	>
		<input type="hidden" id="step" name="step" value={form?.step || 1} />
		<div class="mb-3">
			<label for="bakaServer" class="form-label">Bakaláři server address</label>
			<input
				type="text"
				class={form?.step > 1 ? 'form-control-plaintext fw-bold' : 'form-control'}
				id="bakaServer"
				name="bakaServer"
				value={form?.bakaServer ?? 'https://is.sssvt.cz/IS/Timetable/Public'}
				readonly={form?.step > 1}
				required
				tabindex="-1"
				style={form?.step > 2 ? 'pointer-events: none;' : ''}
			/>
		</div>
		{#if form?.step > 1}
			<div class="mb-3">
				<label for="className" class="form-label">Your class</label>
				<select
					class={form?.step > 2 ? 'form-control-plaintext fw-bold' : 'form-control'}
					id="className"
					name="className"
					readonly={form?.step > 2}
					tabindex="-1"
					style={form?.step > 2 ? 'pointer-events: none;' : ''}
				>
					{#each form?.classes as className}
						<option value={className.name} selected={className.name == form?.className}>
							{className.name}
						</option>
					{/each}
				</select>
			</div>
		{/if}
		{#if form?.step > 2}
			<div class="mb-3">
				<label for="groups" class="form-label">Your groups</label>
				<select class="form-select" id="groups" name="groups" multiple>
					<option value="">None</option>
					{#each form?.groups as group}
						<option value={group}>{group}</option>
					{/each}
				</select>
			</div>
		{/if}

		{#if form?.step == 1 || !form?.step}
			<button type="submit" class="btn btn-primary">Continue</button>
		{/if}
		{#if form?.step == 2}
			<button id="back" class="btn btn-outline-secondary">Go back</button>
			<button type="submit" class="btn btn-primary">Continue</button>
		{/if}
		{#if form?.step == 3}
			<button id="back" class="btn btn-outline-secondary">Go back</button>
			<button type="submit" class="btn btn-success">Save</button>
		{/if}
	</form>
</div>
