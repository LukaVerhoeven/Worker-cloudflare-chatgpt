export default {
  async fetch(request) {
    const url = new URL(
      request.url.replace(
        "https://osrs-proxy.yourdomain.workers.dev/",
        "https://prices.runescape.wiki/"
      )
    );
    return fetch(url.href, {
      method: request.method,
      headers: {
        "User-Agent": "my-osrs-gpt-agent/1.0",
      },
    });
  },
};
