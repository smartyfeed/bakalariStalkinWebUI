<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container half-width">
	<h3>Informace o odběru - {data.sub.label}</h3>
	<div class="mb-3">
		<label for="bakaServer" class="form-label">Adresa serveru Bakaláři</label>
		<input
			type="text"
			class="form-control"
			id="bakaServer"
			name="bakaServer"
			value={data.sub.bakaServer ?? ''}
			disabled
		/>
	</div>
	<div class="mb-3">
		<label for="className" class="form-label">Třída</label>
		<input
			type="text"
			class="form-control"
			id="className"
			name="className"
			value={data.sub.className ?? ''}
			disabled
		/>
	</div>
	<div class="mb-3">
		<label for="groups" class="form-label">Skupiny</label>
		<input
			type="text"
			class="form-control"
			id="groups"
			name="groups"
			value={data.sub.groups.join(', ')}
			disabled
		/>
	</div>
	<div class="mb-3">
		<label for="label" class="form-label">Štítek</label>
		<input
			type="text"
			class="form-control"
			id="label"
			name="label"
			value={data.sub.label}
			disabled
		/>
	</div>
	{#if data.sub.pausedUntil > Date.now()}
		<div class="mb-3">
			<label for="pausedUntil" class="form-label">Pozastaveno do</label>
			<input
				type="text"
				class="form-control"
				id="pausedUntil"
				name="pausedUntil"
				value={new Date(data.sub.pausedUntil).toLocaleString()}
				disabled
			/>
		</div>
	{/if}

	<div class="form-check mb-3">
		<input
			class="form-check-input"
			type="checkbox"
			value=""
			id="notificationOnClassStart"
			checked={data.sub.notificationOnClassStart == 1}
			disabled
		/>
		<label class="form-check-label" for="notificationOnClassStart">
			Oznámení na začátku hodiny
		</label>
	</div>
	<div class="buttons">
		<a class="btn btn-primary" href="/sub/{data.sub.id}/edit">Upravit</a>
		<a class="btn btn-outline-danger" href="/sub/{data.sub.id}/delete">Smazat</a>
	</div>
</div>

<style>
	.buttons a:last-child {
		float: right;
	}
</style>
