import { parse } from '$lib/server/parse';
import type { RequestEvent } from '@sveltejs/kit';

export function GET(event: RequestEvent) {
	const regex = event.url.searchParams.get('regex')!;
	const input = event.url.searchParams.get('input')!;
	console.log(`GET <- regex: ${regex}, input: ${input}`);
	return new Response(JSON.stringify(parse(regex, input)));
}
