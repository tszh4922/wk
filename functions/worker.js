export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.hostname = 'yx.tszh.us.ci'; 
    return fetch(new Request(url, request));
  }
};
