export default {
  async fetch(request) {
    const url = new URL(request.url);
    const upstreamPath = url.pathname.replace(/^\/?/, "");
    const originalTarget = `https://prices.runescape.wiki/${upstreamPath}`;

    // Filter query for `id` if present
    const itemIds = url.searchParams.get("id");
    const headers = { "User-Agent": "my-osrs-gpt-bot/1.0" };

    const target = itemIds ? `${originalTarget}?id=${itemIds}` : originalTarget;

    const response = await fetch(target, { headers });
    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  },
};
