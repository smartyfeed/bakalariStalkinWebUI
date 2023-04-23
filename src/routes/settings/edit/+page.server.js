import { post } from '$lib/global.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
    let result = await post(
			'/updateSettings',
			await request.formData(),
			{ token: cookies.get('token') },
      false
		);
    if (result.status == 303) {
      throw redirect(303, "/settings");
    }
		return await result.json();
	}
};
