import adapter from "@sveltejs/adapter-static";
/**
 * This will add autocompletion if you're working with SvelteKit
 *
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  kit: {
    adapter: adapter(),
  },
};

export default config;
