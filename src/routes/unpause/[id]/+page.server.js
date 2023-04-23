import { post } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	if (params.id) {
		let body = { id: params.id, unpause: true };
		await post(`/pauseSub`, body, { token: cookies.get('token') }, false);
	}
  throw redirect(301, '/');
}