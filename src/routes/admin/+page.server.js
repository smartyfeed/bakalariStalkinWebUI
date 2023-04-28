import { get } from '$lib/global.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  let response = await get('/admin', { token: cookies.get('token') }, true);

  if (response.status != 200) {
    throw redirect(304, '/');
  }

  return {stalkers: response.stalkers}
}
