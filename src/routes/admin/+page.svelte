<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<div class="stats">
		<h3>Stats</h3>
		<div class="stats-wrap">
			<div class="list-group list-group-root well border">
				<span class="list-group-item fw-bold">bakalariStalkinBot:</span>
				<div class="list-group">
					<span class="list-group-item">Cache:</span>
					<div class="list-group">
						<span class="list-group-item"
							>Subscriptions: <span class="fw-bold">{data.stats.stalk.subs}</span></span
						>
						<span class="list-group-item"
							>Timetables: <span class="fw-bold">{data.stats.stalk.TTs}</span></span
						>
						<span class="list-group-item"
							>Schools: <span class="fw-bold">{data.stats.stalk.schools}</span></span
						>
					</div>
				</div>
				<span class="list-group-item fw-bold">Environment:</span>
				<div class="list-group env-stats env-stats-desktop">
					<div class="list-group-item env-row titles"><span>Bot:</span><span>WebUI:</span></div>
					<div class="list-group">
						<div class="list-group-item env-row">
							<span>Node: <span class="fw-bold">{data.stats.env.node}</span></span><span
								>Node: <span class="fw-bold">{data.UIstats.node}</span></span
							>
						</div>
						<div class="list-group-item env-row">
							<span>Commit: <span class="fw-bold">{data.stats.env.commit}</span></span><span
								>Commit: <span class="fw-bold">{data.UIstats.commit}</span></span
							>
						</div>
						<div class="list-group-item env-row">
							<span>Uptime: <span class="fw-bold">{data.stats.env.uptime}</span></span><span
								>Uptime: <span class="fw-bold">{data.UIstats.uptime}</span></span
							>
						</div>
					</div>
				</div>
				<span class="list-group-item env-stats-mobile">Bot:</span>
				<div class="list-group env-stats-mobile">
					<span class="list-group-item"
						>Node: <span class="fw-bold">{data.stats.env.node}</span></span
					>
					<span class="list-group-item"
						>Commit: <span class="fw-bold">{data.stats.env.commit}</span></span
					>
					<span class="list-group-item"
						>Uptime: <span class="fw-bold">{data.stats.env.uptime}</span></span
					>
				</div>
				<span class="list-group-item env-stats-mobile">WebUI:</span>
				<div class="list-group env-stats-mobile">
					<span class="list-group-item"
						>Node: <span class="fw-bold">{data.stats.env.node}</span></span
					>
					<span class="list-group-item"
						>Commit: <span class="fw-bold">{data.stats.env.commit}</span></span
					>
					<span class="list-group-item"
						>Uptime: <span class="fw-bold">{data.stats.env.uptime}</span></span
					>
				</div>
			</div>
			<div class="list-group list-group-root well border">
				<span class="list-group-item fw-bold">Discord:</span>
				<div class="list-group">
					<span class="list-group-item">Connection:</span>
					<div class="list-group">
						<span class="list-group-item"
							>Gateway: <span class="fw-bold">{data.stats.discord.connection.gateway}</span></span
						>
						<span class="list-group-item"
							>Ping: <span class="fw-bold">{data.stats.discord.connection.ping}</span></span
						>
					</div>
					<span class="list-group-item"
						>Uptime: <span class="fw-bold">{data.stats.discord.uptime}</span></span
					>
					<span class="list-group-item">Cache:</span>
					<div class="list-group">
						<span class="list-group-item"
							>Users: <span class="fw-bold">{data.stats.discord.cache.users}</span></span
						>
						<span class="list-group-item"
							>Guilds: <span class="fw-bold">{data.stats.discord.cache.guilds}</span></span
						>
						<span class="list-group-item"
							>Channels: <span class="fw-bold">{data.stats.discord.cache.channels}</span></span
						>
						<span class="list-group-item"
							>Messages: <span class="fw-bold">{data.stats.discord.cache.messages}</span></span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex-thing">
		<h3>Active subs</h3>
		<button
			class="btn btn-outline-primary"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target=".multi-collapse"
			aria-expanded="false">Toggle all subs</button
		>
	</div>
	<table class="table table-hover table-bordered mt-3">
		<tbody>
			{#each Object.entries(data.stalkers) as [id, stuff]}
				<tr>
					<td class="fw-bold">
						<button
							class="btn btn-default btn-xs"
							data-bs-toggle="collapse"
							data-bs-target="#{id}"
							aria-expanded="false"><i class="bi bi-eye" /></button
						>
						{stuff.user.tag}
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<div class="collapse multi-collapse" {id}>
							<table class="table">
								<thead class="container-fluid">
									<tr class="row">
										<th scope="col" class="col">ID</th>
										<th scope="col" class="col">Label</th>
										<th scope="col" class="col">Class</th>
										<th scope="col" class="col">Groups</th>
										<th scope="col" class="col">On class start</th>
										<th scope="col" class="col">Paused</th>
									</tr>
								</thead>
								<tbody class="container-fluid">
									{#each stuff.subs as sub}
										<tr class="row">
											<td class="col">{sub.id}</td>
											<td class="col">{sub.label}</td>
											<td class="col">{sub.className}</td>
											<td class="col">{sub.groups.join(', ')}</td>
											<td class="col">{sub.notificationOnClassStart == 1 ? 'Yes' : 'No'}</td>
											<td class="col">{sub.pausedUntil > Date.now()
												? new Date(sub.pausedUntil).toLocaleString()
												: 'No'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.row {
		margin: 0 !important;
	}

	.flex-thing {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.stats-wrap {
		display: flex;
		flex-direction: row;
		gap: 2em;
		padding: 0 0 1em 0;
	}

	.stats-wrap > * {
		flex: 1;
		height: fit-content;
	}

	.stats {
		margin: 0 0 1em 0;
	}

	.env-row {
		display: flex;
	}

	.env-row > * {
		flex: 1;
	}

	.env-row:not(.titles) > *:nth-child(2n) {
		margin-left: 2em;
	}

	.env-stats-mobile {
		display: none;
	}

	@media screen and (max-width: 600px) {
		.stats-wrap {
			flex-direction: column;
			gap: 1em;
		}

		.env-stats-desktop {
			display: none;
		}

		.env-stats-mobile {
			display: block;
		}
	}
	.list-group.list-group-root {
		padding: 0;
		overflow: hidden;
	}

	.list-group.list-group-root .list-group {
		margin-bottom: 0;
	}

	.list-group.list-group-root .list-group-item {
		border-radius: 0;
		border-width: 1px 0 0 0;
	}

	.list-group.list-group-root > .list-group-item:first-child {
		border-top-width: 0;
	}

	.list-group.list-group-root > .list-group > .list-group-item {
		padding-left: 30px;
	}

	.list-group.list-group-root > .list-group > .list-group > .list-group-item {
		padding-left: 45px;
	}
</style>
