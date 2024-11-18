<script lang="ts">
	import type { ParseContext } from '$lib/server/parse';

	export let context: ParseContext = { pos: 0, tokens: [] };
</script>

<div class="mt-8">
	<pre class="text-sm">{JSON.stringify(context, null, 4)}</pre>
</div>
