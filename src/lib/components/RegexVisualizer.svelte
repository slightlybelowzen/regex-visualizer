<script lang="ts">
	import type { Token } from '$lib/server/parse';

	export let tokens: Token[] = [];
</script>

<svelte:head></svelte:head>

<div class="mt-6 w-full">
	<pre class="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm">{JSON.stringify(
			tokens,
			null,
			2
		)}</pre>
</div>
