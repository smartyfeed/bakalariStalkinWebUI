<script>
	import { page } from '$app/stores';
	import User from '$lib/User.svelte';
	import { get } from '$lib/global.js';
	var userPromise = get('/user');
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary navbar">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img
				src="https://cdn.discordapp.com/avatars/891012315128942644/cd50ffd6c2b8a07881f63ccdbbcd9742.webp?size=512"
				alt=""
				width="50px"
				height="50px"
			/>
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" class:active={$page.url.pathname === '/'} href="/">Dashboard</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://absence.smartyfeed.me" target="_blank">Absence</a>
				</li>
				{#await userPromise}
					<!-- svelte-ignore empty-block -->
				{:then user}
					<!-- svelte-ignore empty-block -->
					{#if user.error == 'E_BAD_SESSION_TOKEN'}{:else}
						<li class="nav-item">
							<a class="nav-link" class:active={$page.url.pathname === '/settings'} href="/settings"
								>Nastavení</a
							>
						</li>
						{#if user.isAdmin}
							<li class="nav-item">
								<a class="nav-link" class:active={$page.url.pathname === '/admin'} href="/admin"
									>Admin panel</a
								>
							</li>
						{/if}
					{/if}
				{/await}
				<li class="nav-item user">
					<User />
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.user {
		font-size: 1.1em !important;
	}

	@media (max-width: 1199.98px) {
		.user {
			margin-left: -0.5em;
			margin-top: 0.5em;
		}
	}
	@media (min-width: 992px) {
		.user {
			padding-right: 3rem !important;
			padding-left: 3rem !important;
			right: 0 !important;
			position: absolute !important;
		}
	}
</style>
