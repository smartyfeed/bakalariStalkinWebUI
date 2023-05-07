// @ts-nocheck
import { get } from '$lib/global.js';
import { redirect } from '@sveltejs/kit';
import fs from 'fs';
import ms from 'ms';


/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  let response = await get('/admin', { token: cookies.get('token') }, true);

  if (response.status != 200) {
    throw redirect(301, '/');
  }

  let hash = fs.readFileSync(".git/" + fs.readFileSync(".git/HEAD", "utf8").replace(/ref: |\n/g,""), "utf8");
  let env = {
    node: process.version,
    commit: hash.substr(0, 6),
    uptime: Math.floor(process.uptime() * 1000),
  };
  env.uptime = `${env.uptime} (${ms(env.uptime)})`;

  return {stalkers: response.stalkers, stats: response.stats, UIstats: env}
}
