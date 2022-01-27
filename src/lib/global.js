import { dev, browser } from '$app/env';

export const apiBase = dev ? 'http://localhost:1337' : 'https://bakalari.smartyfeed.me/api';

if(dev && browser) var token = location.hash.slice(1);

export const get = async function(url, options = {}, json = true) {

  if(url.startsWith("/"))
  url = apiBase + url;

  if(dev && browser)
    options.token = token;

  var params = new URLSearchParams(options);
  url += "?" + params.toString();

  var response = await fetch(url);
  if(json)
    return await response.json();
  return response.text();
}
