<script lang="ts">
	import type { AST } from '$lib/server/parse';

	export let ast: AST = {};
</script>

<div>
	<pre class="whitespace-pre-wrap text-base">{JSON.stringify(ast)}</pre>
</div>
