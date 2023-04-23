import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  cookies.set('token', '', { path: '/' });

	throw redirect(301, '/');
}
