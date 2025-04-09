export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Extract just the path to append to real API
    const upstreamPath = url.pathname.replace(/^\/?/, ""); // Remove leading slash
    const target = `https://prices.runescape.wiki/${upstreamPath}`;

    // Forward the request with the required User-Agent
    const response = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent": "my-osrs-gpt-bot/1.0",
      },
    });

    // Return the response as-is, making sure it's JSON
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
