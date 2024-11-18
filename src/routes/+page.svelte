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
		const data = await response.json();
		ast = data.tokens;
	}
</script>

<svelte:head>
	<title>Regex Visualizer</title>
</svelte:head>

<main class="flex flex-col items-center justify-center">
	<header class="text-center">
		<h1 class="mb-2 text-2xl font-semibold tracking-tighter md:text-3xl md:tracking-tight">
			Visualising a regex engine
		</h1>
		<p class="text-zinc-400">
			Something I've wanted to do for a while, combining writing a simple compiler (yes, regex
			engines are simple compilers) and visualising the various stages of the output. I've only
			implemented a small subset of the regex language for the time being. It supports groups
			<code>()</code>, alternation <code>|</code>, and repetition <code>*</code>, <code>+</code>
			,<code>?</code>
		</p>
	</header>
	<form onsubmit={parseRegex} class="mt-8 flex flex-col items-center gap-4">
		<div class="flex flex-col gap-4 md:flex-row md:gap-6">
			<div>
				<label for="regex">Regex</label>
				<input type="text" name="regex" bind:value={regex} placeholder="regex" />
			</div>
			<div>
				<label for="input">Input</label>
				<input type="text" name="input" bind:value={input} placeholder="string to match on" />
			</div>
		</div>
		<button class="mt-2" type="submit">Visualize</button>
	</form>
	{#if ast}
		<RegexVisualizer tokens={ast} />
	{/if}
	<p class="mt-8 border-l-4 border-amber-700 bg-amber-700/10 px-1 py-2 text-center text-zinc-400">
		PS. It's nowhere near finished, I'm still working on making this visualizer prettier and adding
		the time travelling evaluation engine.
	</p>
</main>
