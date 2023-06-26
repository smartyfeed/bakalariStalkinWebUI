import { post } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	console.log(params);
	if (params.id) {
		let body = { id: params.id, unpause: true };
		console.log(body);
		await post(`/pauseSub`, body, { token: cookies.get('token') }, false);
	}
  throw redirect(301, '/');
}