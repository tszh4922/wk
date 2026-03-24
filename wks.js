export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 【修改点】这里填你 Pages 的原始域名 (不带 https://)
    const targetHost = 'ddd-6cz.pages.dev'; 

    // 如果检测到是 WebSocket 升级请求（v2rayNG 发起的）
    if (request.headers.get('Upgrade') === 'websocket') {
      const newRequest = new Request(`https://${targetHost}${url.pathname}${url.search}`, request);
      newRequest.headers.set('Host', targetHost);
      // 必须直接返回 fetch 的结果，不能手动构造 Response，这样才能建立隧道
      return fetch(newRequest);
    }

    // 普通网页请求处理（供浏览器访问/trace）
    const newRequest = new Request(request);
    newRequest.headers.set('Host', targetHost);
    return fetch(`https://${targetHost}${url.pathname}${url.search}`, newRequest);
  }
};
