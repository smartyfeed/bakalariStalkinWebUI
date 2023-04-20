import { post } from '$lib/global.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let token = cookies.get('token');
		data.append('token', token);
		var response = await post('/updateSettings', data, {}, false);
		var responseJSON = await response.json();

		if (response.status != 200) {
			return fail(response.status, { error: responseJSON.error, message: responseJSON.message });
		}

		return { success: true };
	}
};
