import { post } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	if (params.id && params.id != 'new') {
		let body = { id: params.id };
		await post(`/deleteSub`, body, { token: cookies.get('token') }, false);
	}
  throw redirect(301, '/');
}