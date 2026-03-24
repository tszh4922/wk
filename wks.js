export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 【修改点】这里填你 Pages 的原始域名 (xxx.pages.dev)
    const targetHost = 'ddd-6cz.pages.dev'; 

    // 如果是 WebSocket 请求（v2rayNG 发出的）
    if (request.headers.get('Upgrade') === 'websocket') {
      const newRequest = new Request(`https://${targetHost}${url.pathname}${url.search}`, request);
      newRequest.headers.set('Host', targetHost);
      // 关键：fetch 必须透传请求，才能建立 WS 隧道
      return fetch(newRequest);
    }

    // 如果是普通网页请求（浏览器访问）
    const newRequest = new Request(request);
    newRequest.headers.set('Host', targetHost);
    return fetch(`https://${targetHost}${url.pathname}${url.search}`, newRequest);
  }
};
