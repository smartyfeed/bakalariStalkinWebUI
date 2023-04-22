import { dev, browser } from "$app/environment";

export const apiBase = dev
  ? "http://localhost:1337"
  : "https://bakalari.smartyfeed.me/api";

if (dev && browser) var token = location.hash.slice(1);

export const get = async function (url, options = {}, json = true) {
  if (url.startsWith("/")) url = apiBase + url;
  
  if (dev && browser) options.token = token;
  var params = new URLSearchParams(options);
  url += "?" + params.toString();

  var response = await fetch(url);
  if (json) return await response.json();
  return response.text();
};

export const post = async function (url, body, options = {}, json = true) {
  if (url.startsWith("/")) url = apiBase + url;

  var object = {};

  if (body instanceof FormData) {
    body.forEach((value, key) => {
      if(!Reflect.has(object, key)){
          object[key] = value;
          return;
      }
      if(!Array.isArray(object[key])){
          object[key] = [object[key]];    
      }
      object[key].push(value);
  });
  } else {
    object = body;
  }

  var params = new URLSearchParams(options);
  url += "?" + params.toString();

  var response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(object)
    })

  if (json) return await response.json();
  return response;
};
