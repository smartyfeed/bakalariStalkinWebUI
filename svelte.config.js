import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
/**
 * This will add autocompletion if you're working with SvelteKit
 *
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: preprocess({
    scss: {
      prependData: `@import 'static/global.scss';`,
    },
  }),
  kit: {
    adapter: adapter(),
    target: "#svelte",
  },
};

export default config;
