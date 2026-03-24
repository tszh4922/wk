export default {
  async fetch(request) {
    const url = new URL(request.url);
    // 【必填】这里换成你 Pages 的原始域名，例如: my-site.pages.dev
    const targetHost = 'ddd-6cz.pages.dev'; 

    // 处理 WebSocket (v2rayNG 需要)
    if (request.headers.get('Upgrade') === 'websocket') {
      const newRequest = new Request(`https://${targetHost}${url.pathname}${url.search}`, request);
      newRequest.headers.set('Host', targetHost);
      return fetch(newRequest);
    }

    // 处理普通网页
    const newRequest = new Request(request);
    newRequest.headers.set('Host', targetHost);
    return fetch(`https://${targetHost}${url.pathname}${url.search}`, newRequest);
  }
};
