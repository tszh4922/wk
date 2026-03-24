export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 【修改重点】这里填你 Pages 的原始域名 (xxx.pages.dev)
    const targetHost = 'ddd-6cz.pages.dev'; 
    
    // 修改请求的 Host，确保 Pages 能够识别
    const newRequest = new Request(request);
    newRequest.headers.set('Host', targetHost);
    
    // 构造新的请求 URL
    const targetUrl = `https://${targetHost}${url.pathname}${url.search}`;
    
    // 加上 redirect: 'follow' 确保处理可能的 301 跳转
    return fetch(targetUrl, {
      method: newRequest.method,
      headers: newRequest.headers,
      body: newRequest.body,
      redirect: 'follow'
    });
  }
};
