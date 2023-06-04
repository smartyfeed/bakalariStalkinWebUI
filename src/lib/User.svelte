<script>
	import { get, apiBase } from '$lib/global.js';
	var userPromise = get('/user');
	var settingsPromise = get('/settings');
</script>

{#await userPromise}
	<p>loading</p>
{:then user}
	{#if user.error == 'E_BAD_SESSION_TOKEN'}
		<div class="login-btns">
			<div>
				<a rel="external" href="{apiBase}/auth" class="btn btn-discord">
					<i class="bi bi-discord" />
					<div class="sign-in-text">Log in with Discord</div>
				</a>
			</div>
      <div>
				<a rel="external" href="https://matrix.to/#/@luk_mom_i_have_a_stalker:smartyfeed.me" class="btn btn-matrix">
					<img src="/matrix-logo.svg" alt="">
					<div class="sign-in-text">Log in with Matrix</div>
				</a>
			</div>
			<div>
				<script
					async
					src="https://telegram.org/js/telegram-widget.js?22"
					data-telegram-login="luk_mom_I_have_a_stalker_bot"
					data-size="large"
					data-userpic="false"
					data-radius="6"
					data-auth-url="https://bakalari.smartyfeed.me/api/telegramAuth"
					data-request-access="write"
				></script>
			</div>
		</div>
	{:else}
		<div class="container-fluid">
			<img
				src={user.avatar}
				style="border-radius: 50%; height: 2.3em; margin-right: 0.5em;"
				alt="{user.username}'s avatar"
			/>
			{user.username}
			<a
				href="{apiBase}/logout"
				class="btn btn-secondary"
				style="margin-bottom: 0.1em; margin-left: 1.5em"
				data-sveltekit-reload>Odhlásit se</a
			>
		</div>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- svelte-ignore empty-block -->
{#await settingsPromise}{/await}

<style>
	.btn-discord {
		background-color: var(--blurple);
		color: #fff;
		display: flex;
		justify-content: space-between;
    align-items: center;
		max-width: 13.5rem;
		height: 2.55em;
		gap: 0.5em;
	}

	.btn-discord:hover {
		background-color: #4953bd;
		color: #fff !important;
	}
	.btn-discord i {
		font-size: 1.5em;
	}

  .btn-matrix {
		background-color: #fff;
		color: #000;
		display: flex;
		justify-content: space-between;
		max-width: 14.5rem;
		height: 2.5em;
	}

	.btn-matrix:hover {
		background-color: #b7b7b7;
		color: #000 !important;
	}

	.login-btns {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	.sign-in-text {
		white-space: nowrap;
	}

	@media (max-width: 1199.98px) {
		.login-btns > div {
			margin-left: 0.5em;
		}

		.login-btns {
			flex-direction: column;
		}

		.btn-discord {
			gap: 0.5em;
		}
		.btn-matrix {
			gap: 0.5em;
		}
	}
</style>
