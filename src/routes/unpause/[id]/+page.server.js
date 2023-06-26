import { post } from '$lib/global';

export async function load({ cookies, params }) {
	if (params.id) {
		let body = { id: params.id, unpause: true };
		await post(`/pauseSub`, body, { token: cookies.get('token') }, false);
	}
}