<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LetterElement from "$lib/components/LetterElement.svelte";
	import type { LetterItem } from "$lib/types/LetterType";
	import { getLetters } from "$lib/utils/LetterUtils";

	let letters: LetterItem[] = $state([]);

	const id = $page.params.id;

	const fetchLetters = async () => {
		try {
			if (id == null || id == undefined) {
				goto("/");
				return;
			}

			letters = await getLetters(id);
		} catch (err: any) {
			alert(err.response?.data?.message || "편지 데이터를 가져오는 중 오류가 발생했습니다.");
		}
	};

	$effect(() => {
		fetchLetters();
	});

	const moveBack = () => {
		goto(`/fireplace/${id}`);
	};
</script>

<div class="container">
	<div class="title">
		<button class="backBtn" onclick={moveBack}>ᐊ</button>
		<div>편지함</div>
	</div>
	<div class="letterCnt">{`전체 편지 : ${letters.length}개`}</div>
	<div class="letterContainer">
		{#if letters.length == 0}
			<div class="nullLetterText">아직 작성된 편지가 없습니다</div>
		{:else}
			{#each letters as letter}
				<LetterElement {id} {letter} />
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
		display: flex;
		gap: 8px;
	}

	.backBtn {
		background-color: transparent;
		color: white;
		border: 0;
		outline: 0;
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
