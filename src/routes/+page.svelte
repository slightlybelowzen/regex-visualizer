<script lang="ts">
	import { goto } from '$app/navigation';
	import '@fontsource-variable/fira-code';
	import '@fontsource/fira-sans';
	import RegexVisualizer from '$lib/components/RegexVisualizer.svelte';

	let input = $state('');
	let ast = $state(null);
	let regex = $state('');

	async function parseRegex(e: SubmitEvent) {
		e.preventDefault();
		const searchParams = new URLSearchParams({
			regex: regex,
			input: input
		});
		goto(`?${searchParams.toString()}`);
		const response = await fetch(`/parser?${searchParams.toString()}`);
		if (!response.ok) {
			throw new Error('Failed to parse regex and construct ASt');
		}
		ast = await response.json();
	}
</script>

<svelte:head>
	<title>Regex Visualizer</title>
</svelte:head>

<main class="flex flex-col items-center justify-center">
	<header class="text-center">
		<h1 class="mb-2 text-3xl font-semibold">Visualising a regex engine</h1>
		<p class="text-zinc-400">
			Something I've wanted to do for a while, combining writing a simple compiler (yes, regex
			engines are simple compilers) and visualising the various stages of the output.
		</p>
	</header>
	<form onsubmit={parseRegex} class="mt-12 flex flex-col items-center gap-4">
		<div class="flex gap-6">
			<div>
				<label for="regex">Regex input</label>
				<input type="text" name="regex" class="mb-4" bind:value={regex} placeholder="Regex" />
			</div>
			<div>
				<label for="input">String input (to match against)</label>
				<input type="text" name="input" bind:value={input} placeholder="String to match on" />
			</div>
		</div>
		<button type="submit">Visualize</button>
	</form>
	{#if ast}
		<div class="mt-8">
			<RegexVisualizer {ast} />
		</div>
	{/if}
</main>
