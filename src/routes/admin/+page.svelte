<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<h3>Aktivní odběry</h3>
	<table class="table table-hover table-bordered">
		<thead>
			<tr>
				<th scope="col">Stalker</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(data.stalkers) as [id, stuff]}
				<tr>
					<td class="fw-bold">
						<button class="btn btn-default btn-xs" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded="false"><i class="bi bi-eye" /></button>
						{stuff.user.tag}
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<div class="collapse multi-collapse" id="{id}">
							<table class="table">
								<thead class="container-fluid">
									<tr class="row">
										<th scope="col" class="col">ID</th>
										<th scope="col" class="col">Label</th>
										<th scope="col" class="col">Class</th>
										<th scope="col" class="col">Groups</th>
										<th scope="col" class="col">On class start</th>
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
</style>
