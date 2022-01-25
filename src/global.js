export const apiBase = 'https://bakalari.smartyfeed.me/api';
export const get = async function(url, options = {}, json = true) {

  if(url.startsWith("/"))
  url = apiBase + url;

  var params = new URLSearchParams(options);
  url += "?" + params.toString();

  var response = await fetch(url);
  if(json)
    return await response.json();
  return response.text();
}
