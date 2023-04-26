import { post, get } from '$lib/global';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	let defaults = await get('/settings', { token: cookies.get('token') }); 

	if (params.id && params.id != 'new') {
		let body = { id: params.id };
		let res = await post(`/sub`, body, { token: cookies.get('token') }, false);
		if (res.status != 200) {
			throw redirect(301, '/');
		}
		let response = await res.json();
		response = {...response, ...defaults};
		return response;
	}

  return defaults;
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
    let result = await post(
			'/manageSub',
			await request.formData(),
			{ token: cookies.get('token') },
      false
		);
    if (result.status == 303) {
      throw redirect(303, "/");
    }
		return await result.json();
	}
};

