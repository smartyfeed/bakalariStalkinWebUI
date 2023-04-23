import { post } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	if (params.id) {
		if (params.id == 'new') {
			throw redirect(303, '/sub/new/edit');
		}

		let body = { id: params.id };
		let res = await post(`/sub`, body, { token: cookies.get('token') }, false);
		if (res.status != 200) {
			throw redirect(301, '/');
		}
		return await res.json();
	}
}
