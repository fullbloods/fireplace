<script lang="ts">
	import LetterElement from '$lib/components/LetterElement.svelte';

	let letters: {
		id: number;
		name: string;
		day: number;
		private: boolean;
	}[] = [
		{ id: 1, name: '전여친', day: 2, private: false },
		{ id: 2, name: '전여친', day: 2, private: true },
		{ id: 3, name: '전여친', day: 10, private: false }
	];

	$: cnt = letters.length;
</script>

<div class="container">
	<div class="title">편지함</div>
	<div class="letterCnt">{`전체 편지 : ${cnt}개`}</div>
	<div class="letterContainer">
		{#each letters as letter (letter.id)}
			<LetterElement {letter} />
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 50px;
	}

	.title {
		color: #fff;
		font-size: 24px;
	}

	.letterCnt {
		color: #fff;
		font-size: 16px;
		margin-top: 20px;
	}

	.letterContainer {
		padding-top: 10px;
	}
</style>
