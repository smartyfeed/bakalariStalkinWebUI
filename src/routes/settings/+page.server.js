// @ts-nocheck
import { post, get } from '$lib/global.js';
import { fail } from '@sveltejs/kit';
var res = {};
var inflow = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	if (!inflow) {
		let response = await get('/settings', { token: cookies.get('token') });
		res.settings = response.settings;
		res.step = 4;
		if (!res.settings.bakaServer || !res.settings.className || !res.settings.groups) {
			res.step = 1;
			return res;
		}
		res.settings.groups = JSON.parse(res.settings.groups);
		res.classes = response.classes;
		res.groups = response.groups;
	}
	return res;
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		if (
			(data.get('bakaServer') != res.settings.bakaServer && res.step == 4) ||
			(data.get('className') != res.settings.className && res.step == 4) ||
			data.get('step') == 1
		) {
			inflow = true;

			let response = await post('/server', data, { token: cookies.get('token') }, false);
			let responseJSON = await response.json();
			if (response.status != 200) {
				res.step = 1;
				return fail(response.status, {
					error: responseJSON.error,
					message: responseJSON.message
				});
			}

			res.settings.bakaServer = responseJSON.bakaServer;
			res.classes = responseJSON.classes;

			res.step = 2;
			return {
				data: {
					inflow: true
				}
			};
		}

		if (data.get('step') == 2) {
			data.set('bakaServer', res.settings.bakaServer);
			let response = await post('/groups', data, { token: cookies.get('token') }, false);
			let responseJSON = await response.json();

			if (response.status != 200) {
				res.step = 2;
				return fail(response.status, {
					error: responseJSON.error,
					message: responseJSON.message
				});
			}
			res.groups = responseJSON;

			res.settings.className = data.get('className');

			res.step = 3;
			return {
				data: {
					inflow: true
				}
			};
		}
		if (data.get('step') >= 3) {
			data.set('bakaServer', res.settings.bakaServer);
			let response = await post('/updateSettings', data, { token: cookies.get('token') }, false);
			let responseJSON = await response.json();

			if (response.status != 200) {
				switch (responseJSON.error) {
					case 'E_BAD_BAKA_SERVER':
						res.step = 1;
						break;
					case 'E_BAD_CLASS_NAME':
						res.step = 2;
						break;
					case 'E_BAD_GROUPS':
						res.step = 3;
					default:
						res.step = 1;
				}
				return fail(response.status, {
					error: responseJSON.error,
					message: responseJSON.message
				});
			}

			res.step = 4;
			inflow = false;
			return {
				data: {
					inflow: false
				},
				success: true
			};
		}
	}
};
