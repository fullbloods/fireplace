<script lang="ts">
	import { showBottomSheet } from "$lib/store/modalStore";
	import BottomSheet from "$lib/components/WritingBottomSheet.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { Letter, LetterCreateDto, LetterReplyDto } from "$lib/types/LetterType";
	import { getLetter, replyLetter } from "$lib/utils/LetterUtils";
	import PasswordBottomSheet from "$lib/components/PasswordBottomSheet.svelte";
	import { passwordProps } from "$lib/store/password";

	const { id, detailId } = $page.params;

	const extractVideoId = (url: string): string | null => {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
		const match = url.match(regex);
		return match ? match[1] : null;
	};

	let letter: Letter | null = $state(null);
	let shortHeight: boolean = $state(false);
	let formData: LetterReplyDto = $state({
		message: "",
		password: "",
		music: ""
	});

	let showPasswordBottomSheet: boolean = $state(false);

	const getLetterDataProcess = async () => {
		try {
			letter = await getLetter(detailId, $passwordProps);
		} catch (err: any) {
			alert("연필를 놓쳐버렸어요! 다시 한 번 시도해주세요 :)");
			goto(`/fireplace/${id}/letterbox/${detailId}`);
		}
	};

	$effect(() => {
		getLetterDataProcess();
	});

	const goBack = () => {
		window.history.back();
	};

	const createReplyProcess = async () => {
		if (!formData.message || !formData.message.trim()) {
			alert("내용을 적어주세요.");
			return;
		}

		let musicId = formData.music ? extractVideoId(formData.music) : null;

		if (formData.music && !musicId) {
			alert("유효한 유튜브 링크를 입력해주세요.");
			return;
		}

		const dto: LetterReplyDto = {
			message: formData.message,
			music: musicId ? `https://youtu.be/${musicId}` : null,
			password: formData.password
		};

		try {
			await replyLetter(detailId, dto);

			alert("답장이 성공적으로 저장되었습니다!");

			goto(`/fireplace/${id}/letterbox/${detailId}`);
		} catch (err: any) {
			console.log(err.response.data.message);
		}
	};

	const checkHeight = () => {
		shortHeight = window.innerHeight <= 670;
	};

	$effect(() => {
		checkHeight();
		window.addEventListener("resize", checkHeight);

		return () => {
			window.removeEventListener("resize", checkHeight);
		};
	});

	const closeBottomSheet = () => {
		showPasswordBottomSheet = false;
	};

	const openPasswordBottomSheet = () => {
		if (!formData.message || !formData.message.trim()) {
			alert("내용을 적어주세요.");
			return;
		}

		let musicId = formData.music ? extractVideoId(formData.music) : null;

		if (formData.music && !musicId) {
			alert("유효한 유튜브 링크를 입력해주세요.");
			return;
		}

		formData.password = "";
		showPasswordBottomSheet = true;
	};
</script>

<div>
	<div class="container" class:shortContainer={shortHeight}>
		<p class="toName">To.{" "}{letter?.name}</p>
		<textarea class="letterContent" placeholder="편지 내용" bind:value={formData.message}
		></textarea>
		<input
			type="text"
			class="musicLinkInput"
			placeholder="들려주고 싶은 노래의 유튜브 링크를 적어주세요"
			bind:value={formData.music}
		/>
		<div class="btnContainer" class:shortHeightStyle={shortHeight}>
			<button type="button" class="customColorBtn" onclick={openPasswordBottomSheet}
				>작성 완료</button
			>
			<button type="button" class="customBtn" onclick={goBack}>닫기</button>
		</div>
	</div>

	{#if showPasswordBottomSheet}
		<PasswordBottomSheet {formData} {createReplyProcess} {closeBottomSheet} />
	{/if}
</div>

<style>
	.container {
		background-color: #114433;
		color: #fff;
		width: 100%;
		height: auto;
		min-height: 100vh;
		padding: 30px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.shortContainer {
		padding: 30px 50px;
		gap: 15px;
	}

	.toName {
		font-size: 22px;
		margin-bottom: 10px;
	}

	.letterContent {
		width: 100%;
		min-height: 200px;
		padding: 16px;
		font-size: 18px;
		border-radius: 10px;
		resize: none;
		outline: none;
	}

	.musicLinkInput {
		width: 100%;
		min-height: 40px;
		border: none;
		font-size: 12px;
		padding: 0 16px;
		border-radius: 10px;
		outline: none;
	}

	.btnContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.btnContainer.shortHeightStyle {
		flex-direction: row-reverse;
	}

	.customBtn,
	.customColorBtn {
		width: 100%;
		height: 40px;
		color: #000;
		border-radius: 10px;
		background-color: #fff;
		border: none;
	}

	.customColorBtn {
		background-color: #ffe51e;
		border: none;
	}
</style>
