<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form;

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container half-width">
	{#if form?.error == 'E_BAD_BAKA_SERVER'}<div class="alert alert-danger" role="alert">
			Neplatná/nepodporovaná adresa serveru!
		</div>{/if}
	{#if form?.error == 'E_BAD_CLASS_NAME'}<div class="alert alert-danger" role="alert">
			Špatný název třídy!
		</div>{/if}
	{#if form?.error == 'E_BAD_GROUPS'}<div class="alert alert-danger" role="alert">
			Neplatné skupiny!
		</div>{/if}
	{#if data.sub?.id}
		<h3>Upravit odběr - {data.sub?.label}</h3>
	{:else}
		<h3>Vytvořit nový odběr</h3>
		<div class="alert alert-dark" role="alert">Vaše výchozí nastavení budou předvyplněna</div>
	{/if}
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
		<input type="hidden" id="oldId" name="oldId" value={data.sub?.id || 'new'} />
		<input type="hidden" id="step" name="step" value={form?.step || 1} />
		<div class="mb-3">
			<label for="bakaServer" class="form-label">Adresa serveru Bakaláři</label>
			<input
				type="text"
				class={form?.step > 1 ? 'form-control-plaintext fw-bold' : 'form-control'}
				id="bakaServer"
				name="bakaServer"
				value={form?.bakaServer ??
					data.sub?.bakaServer ??
					data.settings?.bakaServer ??
					'https://is.sssvt.cz/IS/Timetable/Public'}
				readonly={form?.step > 1}
				required
				tabindex="-1"
				style={form?.step > 2 ? 'pointer-events: none;' : ''}
			/>
		</div>
		{#if form?.step > 1}
			<div class="mb-3">
				<label for="className" class="form-label">Třída</label>
				<select
					class={form?.step > 2 ? 'form-control-plaintext fw-bold' : 'form-control form-select'}
					id="className"
					name="className"
					tabindex="-1"
					style={form?.step > 2 ? 'pointer-events: none;' : ''}
				>
					{#each form?.classes as className}
						<option
							value={className.name}
							selected={className.name ==
								(form?.className ?? data.sub?.className ?? data.settings?.className)}
						>
							{className.name}
						</option>
					{/each}
				</select>
			</div>
		{/if}
		{#if form?.step > 2}
			<div class="mb-3">
				<label for="groups" class="form-label">Skupiny</label>
				<select
					class="form-select"
					id="groups"
					name="groups"
					multiple
					tabindex="-1"
					style={form?.step > 3 ? 'pointer-events: none;' : ''}
				>
					<option value="" selected={data.sub?.groups.length == 0}>Žádné</option>
					{#each form?.groups as group}
						<option
							value={group}
							selected={form?.selectedGroups
								? form?.selectedGroups.includes(group)
								: data.sub?.groups.includes(group)}>{group}</option
						>
					{/each}
				</select>
			</div>
		{/if}
		{#if form?.step > 3}
			<div class="mb-3">
				<label for="label" class="form-label">Štítek</label>
				<input
					type="text"
					class={form?.step > 4 ? 'form-control-plaintext fw-bold' : 'form-control'}
					id="label"
					name="label"
					value={form?.label ?? data.sub?.label ?? form?.className}
					readonly={form?.step > 4}
					tabindex="-1"
					style={form?.step > 4 ? 'pointer-events: none;' : ''}
				/>
			</div>
			<div class="form-check mb-3">
				<input
					class="form-check-input"
					type="checkbox"
					value=""
					id="notificationOnClassStart"
					name="notificationOnClassStart"
					checked={data.sub?.notificationOnClassStart == 1}
				/>
				<label class="form-check-label" for="notificationOnClassStart">
					Oznámení na začátku hodiny
				</label>
			</div>
		{/if}

		{#if form?.step == 1 || !form?.step}
			<button type="submit" class="btn btn-primary">Pokračovat</button>
		{/if}
		{#if form?.step > 1 && form?.step < 4}
			<button id="back" class="btn btn-outline-secondary">Zpět</button>
			<button type="submit" class="btn btn-primary">Pokračovat</button>
		{/if}
		{#if form?.step == 4}
			<button id="back" class="btn btn-outline-secondary">Zpět</button>
			<button type="submit" class="btn btn-success">Uložit</button>
		{/if}
	</form>
</div>
