<script lang="ts">
	import type { Token } from '$lib/server/parse';

	export let tokens: Token[] = [];
</script>

<div class="mt-8">
	<pre class="text-sm">{JSON.stringify(tokens, null, 2)}</pre>
</div>
