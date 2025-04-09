export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Reconstruct the path and query for the original API
    const targetPath = url.pathname.replace("/api/v1/osrs", "");
    const targetUrl = `https://prices.runescape.wiki/api/v1/osrs${targetPath}${url.search}`;

    // Forward the request
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        accept: "application/json",
        // Forward other headers as needed
      },
    });

    // Return the response
    return new Response(await response.body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type"),
        "access-control-allow-origin": "*",
      },
    });
  },
};
