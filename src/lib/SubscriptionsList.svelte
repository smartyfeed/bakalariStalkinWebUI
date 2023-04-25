<script>
	// @ts-nocheck

	import { get } from '$lib/global.js';
	var listPromise = get('/list');
</script>

<div class="SubscriptionList">
	{#await listPromise}
		<p>loading</p>
	{:then list}
		{#if list.length == 0}
			<h3>Active Subscriptions</h3>
			You have no subscriptions!
		{:else}
			<h3>Active Subscriptions</h3>
			<table class="table table-striped table-hover table-bordered border-light-subtle">
				<thead>
					<tr>
						<th scope="col">Label</th>
						<th scope="col">Class</th>
						<th scope="col">Groups</th>
						<th scope="col">Paused until</th>
						<th scope="col">On class start</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each list as sub}
						<tr>
							<td label="Label">{sub.label}</td>
							<td label="Class">{sub.className}</td>
							<td label="Groups">{JSON.parse(sub.groups).join(', ')}</td>
							<td label="Paused until"
								>{sub.pausedUntil > Date.now()
									? new Date(sub.pausedUntil).toLocaleString()
									: ''}</td
							>
							<td label="On class start">{sub.notificationOnClassStart == 1 ? 'Yes' : 'No'}</td>
							<td label="Actions" class="actions">
								<div class="actions">
									<a href="/sub/{sub.id}" class="btn btn-primary">Edit</a>
									<a href="/pause/{sub.id}" class="btn btn-outline-warning"
										>{sub.pausedUntil > Date.now() ? 'Prolong' : 'Pause'}</a
									>
									{#if sub.pausedUntil > Date.now()}
										<a href="/unpause/{sub.id}" class="btn btn-outline-secondary">Unpause</a>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="lower-nav">
				<a href="sub/new/" class="btn btn-primary">Add new subscription</a>

				{#if list.length > 1}
					<a href="pause/all" class="btn btn-outline-warning">Pause all</a>
				{/if}
				{#if list.filter((sub) => sub.pausedUntil > Date.now()).length > 1}
					<a href="unpause/all" class="btn btn-outline-secondary">Unpause all</a>
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

		.actions a:first-child {
			margin-left: -0.5em;
		}
	}
</style>
