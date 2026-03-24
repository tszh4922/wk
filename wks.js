export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetHost = 'ddd-6cz.pages.dev'; // 换成你真实的 Pages 域名

    // 处理 WebSocket 升级请求
    if (request.headers.get('Upgrade') === 'websocket') {
      const newRequest = new Request(`https://${targetHost}${url.pathname}${url.search}`, request);
      newRequest.headers.set('Host', targetHost);
      return fetch(newRequest);
    }

    // 普通网页请求
    const newRequest = new Request(request);
    newRequest.headers.set('Host', targetHost);
    return fetch(`https://${targetHost}${url.pathname}${url.search}`, newRequest);
  }
};
