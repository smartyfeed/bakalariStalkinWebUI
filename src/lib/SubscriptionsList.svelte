<script>
	// @ts-nocheck

	import { get } from '$lib/global.js';
	var listPromise = get('/list');
</script>

<div class="SubscriptionList">
	{#await listPromise}
		<p>načítání</p>
	{:then list}
		{#if list.length == 0}
			<h3>Aktivní odběry</h3>
			Nemáte žádné odběry!
			<div class="lower-nav">
				<a href="sub/new/" class="btn btn-primary">Přidat nový odběr</a>
			</div>
		{:else}
			<h3>Aktivní odběry</h3>
			<table class="table table-striped table-hover table-bordered border-light-subtle">
				<thead>
					<tr>
						<th scope="col">Štítek</th>
						<th scope="col">Třída</th>
						<th scope="col">Skupiny</th>
						<th scope="col">Pozastaveno do</th>
						<th scope="col">Na začátku hodiny</th>
						<th scope="col">Akce</th>
					</tr>
				</thead>
				<tbody>
					{#each list as sub}
						<tr>
							<td label="Štítek">{sub.label}</td>
							<td label="Třída">{sub.className}</td>
							<td label="Skupiny">{JSON.parse(sub.groups).join(', ')}</td>
							<td label="Pozastaveno do"
								>{sub.pausedUntil > Date.now()
									? new Date(sub.pausedUntil).toLocaleString()
									: ''}</td
							>
							<td label="Na začátku hodiny">{sub.notificationOnClassStart == 1 ? 'Ano' : 'Ne'}</td>
							<td label="Akce" class="actions">
								<div class="actions action-buttons">
									<a href="/sub/{sub.id}" class="btn btn-primary">Upravit</a>
									<a href="/pause/{sub.id}" class="btn btn-outline-warning"
										>{sub.pausedUntil > Date.now() ? 'Prodloužit' : 'Pozastavit'}</a
									>
									{#if sub.pausedUntil > Date.now()}
										<a href="unpause/{sub.id}" class="btn btn-outline-secondary">Obnovit</a>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="lower-nav">
				<a href="sub/new/" class="btn btn-primary">Přidat nový odběr</a>

				{#if list.length > 1}
					<a href="pause/all" class="btn btn-outline-warning">Pozastavit vše</a>
				{/if}
				{#if list.filter((sub) => sub.pausedUntil > Date.now()).length > 1}
					<a href="unpause/all" class="btn btn-outline-secondary">Obnovit vše</a>
				{/if}
			</div>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.actions {
		display: flex;
		gap: 0.5em;
		margin: auto;
	}

	.lower-nav {
		display: flex;
		gap: 0.5em;
		margin-top: 1em;
	}

	@media screen and (max-width: 600px) {
		table thead {
			display: none;
		}
		table td {
			display: flex;
		}

		table td::before {
			content: attr(label);
			font-weight: bold;
			width: 120px;
			min-width: 120px;
		}

		.actions {
			margin: 0;
		}

		.actions a {
			margin-left: -0.5em;
		}

		.action-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.75em;
			width: 100%;
		}
	}
</style>
