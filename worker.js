export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Rewrite path to strip leading "/" if needed
    const upstreamPath = url.pathname.replace(/^\/?/, "");

    // Build the full target URL (preserve all query params)
    const target = `https://prices.runescape.wiki/${upstreamPath}${url.search}`;

    // Clone request and inject custom User-Agent
    const response = await fetch(target, {
      headers: {
        "User-Agent": "my-osrs-gpt-bot/1.0",
      },
    });

    // Pass through the response body & status
    const text = await response.text();

    // Return with CORS and JSON headers
    return new Response(text, {
      status: response.status,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  },
};
