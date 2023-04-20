import adapter from "@sveltejs/adapter-static";
// import preprocess from "svelte-preprocess";
/**
 * This will add autocompletion if you're working with SvelteKit
 *
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  // preprocess: preprocess({
  //   scss: {
  //     includePaths: ['node_modules'],
  //     prependData: `@import 'static/global.scss';`,
      
  //   },
  // }),
  kit: {
    adapter: adapter(),
  },
};

export default config;
