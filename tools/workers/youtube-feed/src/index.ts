export default {
	async fetch(request: Request): Promise<Response> {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, { headers: corsHeaders });
		}

		const channelId = "UCIH_ja-vJqeMaAbtCplORdQ";
		const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

		try {
			const res = await fetch(feedUrl, {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				},
				cf: {
					cacheTtl: 300,
					cacheEverything: true,
				},
			});

			if (!res.ok) {
				return new Response(
					JSON.stringify({ status: "error", message: `YouTube feed returned ${res.status}` }),
					{
						status: 502,
						headers: { "Content-Type": "application/json", ...corsHeaders },
					}
				);
			}

			const xml = await res.text();

			// Parse entries from XML
			const items: Array<{
				title: string;
				link: string;
				guid: string;
				pubDate: string;
				thumbnail: string;
				description: string;
			}> = [];

			const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
			let match: RegExpExecArray | null;

			while ((match = entryRegex.exec(xml)) !== null) {
				const entryContent = match[1];

				const videoIdMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
				const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
				const publishedMatch = entryContent.match(/<published>([^<]+)<\/published>/);
				const descMatch = entryContent.match(/<media:description>([\s\S]*?)<\/media:description>/);

				const videoId = videoIdMatch ? videoIdMatch[1].trim() : "";
				const title = titleMatch ? titleMatch[1].trim() : "";
				const pubDate = publishedMatch ? publishedMatch[1].trim() : "";
				const description = descMatch ? descMatch[1].trim() : "";

				if (videoId) {
					items.push({
						title,
						link: `https://www.youtube.com/watch?v=${videoId}`,
						guid: videoId,
						pubDate,
						thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
						description,
					});
				}
			}

			return new Response(
				JSON.stringify({
					status: "ok",
					items,
				}),
				{
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						"Cache-Control": "public, max-age=300, s-maxage=300",
						...corsHeaders,
					},
				}
			);
		} catch (err: any) {
			return new Response(
				JSON.stringify({
					status: "error",
					message: err.message || "Failed to fetch YouTube feed",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json", ...corsHeaders },
				}
			);
		}
	},
} satisfies ExportedHandler;
