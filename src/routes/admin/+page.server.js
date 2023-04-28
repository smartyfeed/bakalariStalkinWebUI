import { get } from '$lib/global.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	return await get('/admin', { token: cookies.get('token') });
}
