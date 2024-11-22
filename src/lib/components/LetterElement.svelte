<script lang="ts">
	import { goto } from '$app/navigation';
	import { showModal } from '$lib/store/modalStore';
	import LetterPasswordModal from './LetterPasswordModal.svelte';

	export let letter: {
		id: number;
		name: string;
		day: number;
		private: boolean;
	};

	let src: string = '/images/letterImg.png';

	const goToDetail = () => {
		goto(`/fireplace/[id]/letterbox/[detailid]`);
	};

	const handleOpenModal = () => {
		showModal.set(true);
	};
</script>

<div
	class="letterInner"
	on:click={letter.private ? handleOpenModal : goToDetail}
	on:keydown={() => {}}
	tabindex="0"
	role="button"
>
	<img {src} alt="편지" />
	<div class="nameText">{letter.name}</div>
	<div class="dayText">{`D-${letter.day}`}</div>
	<div class="private">
		{#if letter.private}
			🔒
		{/if}
	</div>
</div>

<LetterPasswordModal />

<style>
	.letterInner {
		width: 100%;
		min-height: 50px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.letterInner > img {
		width: 40px;
		height: 30px;
	}

	.nameText {
		font-size: 20px;
		margin-left: 20px;
	}

	.dayText {
		font-size: 14px;
		margin-left: auto;
	}

	.private {
		width: 14px;
		margin-left: 5px;
	}
</style>
