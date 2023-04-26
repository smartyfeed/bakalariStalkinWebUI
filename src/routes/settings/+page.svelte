<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container half-width">
	<h3>Výchozí nastavení</h3>
	<div class="mb-3">
		<label for="bakaServer" class="form-label">Adresa serveru Bakaláři</label>
		<input
			type="text"
			class="form-control"
			id="bakaServer"
			name="bakaServer"
			value={data.settings.bakaServer ?? ''}
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
			value={data.settings.className ?? ''}
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
			value={data.settings.groups?.join(', ') ?? ""}
			disabled
		/>
	</div>
	<a class="btn btn-primary" href="/settings/edit">Upravit</a>
</div>
