import { post } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	if (params.id && params.id != 'all') {
		let body = { id: params.id };
		let res = await post(`/sub`, body, { token: cookies.get('token') }, false);
		if (res.status != 200) {
			throw redirect(301, '/');
		}
		return await res.json();
	}

	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		await post('/pauseSub', await request.formData(), { token: cookies.get('token') }, false);
		throw redirect(303, '/');
	}
};
