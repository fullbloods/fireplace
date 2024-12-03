<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LetterElement from "$lib/components/LetterElement.svelte";
	import type { Letter } from "$lib/types/LetterType";
	import { getLetter } from "$lib/utils/letterList";
	import { onMount } from "svelte";

	let letters: Letter[] = [];
	$: cnt = letters.length;

	const id = $page.params.id;

	const fetchLetters = async () => {
		try {
			if (id == null || id == undefined) {
				goto("/");
				return;
			}
			const fetchedLetters = await getLetter(id);

			letters = fetchedLetters;
		} catch (err: any) {
			alert(err.response?.data?.message || "편지 데이터를 가져오는 중 오류가 발생했습니다.");
		}
	};

	onMount(() => {
		fetchLetters();
	});
</script>

<div class="container">
	<div class="title">편지함</div>
	<div class="letterCnt">{`전체 편지 : ${cnt}개`}</div>
	<div class="letterContainer">
		{#if cnt == 0}
			<div class="nullLetterText">아직 작성된 편지가 없습니다</div>
		{:else}
			{#each letters as letter}
				<LetterElement {letter} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 24px;
		overflow-y: auto;
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

	.nullLetterText {
		color: #fff;
		text-align: center;
		align-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.letterContainer {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 30px;
	}
</style>
