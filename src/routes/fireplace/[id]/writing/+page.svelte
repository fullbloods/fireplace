<script lang="ts">
	import { showBottomSheet } from "$lib/store/modalStore";
	import BottomSheet from "$lib/components/WritingBottomSheet.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { LetterCreateDto } from "$lib/types/LetterType";
	import type { Fireplace } from "$lib/types/FireplaceType";
	import { getFireplace } from "$lib/utils/FireplaceUtils";
	import { writingLetter } from "$lib/utils/LetterUtils";

	const uuid = $page.params.id;

	const extractVideoId = (url: string): string | null => {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
		const match = url.match(regex);
		return match ? match[1] : null;
	};

	let firePlace: Fireplace | null = $state(null);
	let shortHeight: boolean = $state(false);
	let formData: LetterCreateDto = $state({
		name: "",
		content: "",
		private: false,
		password: "",
		date: "",
		music: "",
		openAt: ""
	});

	const getFireplaceDataProcess = async () => {
		try {
			firePlace = await getFireplace(uuid);
		} catch (err: any) {
			alert("연필를 놓쳐버렸어요! 다시 한 번 시도해주세요 :)");
			goto(`/fireplace/${uuid}`);
		}
	};

	$effect(() => {
		getFireplaceDataProcess();
	});

	const handleOpenBottomSheet = () => {
		if (!formData.name.trim()) {
			alert("이름을 입력해주세요.");
			return;
		}

		if (!formData.content.trim()) {
			alert("내용을 적어주세요.");
			return;
		}

		if (formData.music && !extractVideoId(formData.music)) {
			alert("유효한 유튜브 링크를 입력해주세요.");
			return;
		}

		showBottomSheet.set(true);
	};

	const goBack = () => {
		window.history.back();
	};

	const createLetterProcess = async () => {
		if (!formData.name || !formData.name.trim()) {
			alert("이름을 입력해주세요.");
			return;
		}

		if (!formData.content || !formData.content.trim()) {
			alert("내용을 적어주세요.");
			return;
		}

		if (!formData.openAt || !formData.openAt.trim()) {
			alert("날짜를 입력해주세요.");
			return;
		}

		let musicId = formData.music ? extractVideoId(formData.music) : null;

		if (formData.music && !musicId) {
			alert("유효한 유튜브 링크를 입력해주세요.");
			return;
		}

		const payload = {
			name: formData.name,
			content: formData.content,
			music: musicId ? `https://youtu.be/${musicId}` : null,
			private: formData.private,
			password: formData.password,
			openAt: formData.openAt
		};

		try {
			await writingLetter(uuid, payload);

			alert("편지가 성공적으로 저장되었습니다!");
			showBottomSheet.set(false);
			goto(`/fireplace/${uuid}`);
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

	$effect(() => {
		if (!formData.private) {
			formData.password = "";
		}
	});
</script>

<div>
	<div class="container" class:shortContainer={shortHeight}>
		<p class="toName">To.{" "}{firePlace?.name}</p>
		<div class="nameInputWrapper">
			<span class="suffix">from.</span>
			<input type="text" class="nameInput" placeholder="이름 입력" bind:value={formData.name} />
		</div>
		<textarea class="letterContent" placeholder="편지 내용" bind:value={formData.content}
		></textarea>
		<input
			type="text"
			class="musicLinkInput"
			placeholder="들려주고 싶은 노래의 유튜브 링크를 적어주세요"
			bind:value={formData.music}
		/>
		<div class="privateCheckWrapper">
			<input
				type="checkbox"
				id="privateCheckbox"
				class="privateCheckBox"
				bind:checked={formData.private}
			/>
			<label for="privateCheckbox" class="privateNotice"
				>비공개(벽난로 주인만 볼 수 있습니다.)</label
			>
		</div>
		{#if formData.private}
			<input
				type="password"
				class="letterPasswordInput"
				placeholder="편지 비밀번호"
				bind:value={formData.password}
			/>
		{/if}
		<p class="warningMessage">
			욕설 및 음란물, 타인의 명예를 훼손하는 내용과 사용자에게 피해를 줄 수 있는 음악은 관리자에
			의해 삭제될 수 있으며, 수가기관의 요청이 있을 경우 관련자료를 제출할 수 있습니다.
		</p>

		<div class="btnContainer" class:shortHeightStyle={shortHeight}>
			<button type="button" class="customColorBtn" onclick={handleOpenBottomSheet}>작성 완료</button
			>
			<button type="button" class="customBtn" onclick={goBack}>닫기</button>
		</div>
	</div>

	{#if $showBottomSheet}
		<BottomSheet {createLetterProcess} {formData} />
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

	.nameInputWrapper {
		background-color: #fff;
		display: flex;
		align-items: center;
		border-radius: 10px;
		width: 100%;
		min-height: 40px;
		padding: 0 16px;
	}

	.suffix {
		color: #000;
		margin-left: 16px;
		margin-right: 4px;
	}

	.nameInput {
		background-color: #fff;
		border-radius: 10px;
		width: 100%;
		height: 100%;
		border: none;
		font-size: 16px;
		outline: none;
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

	.privateCheckWrapper {
		display: flex;
		gap: 10px;
	}

	.privateCheckBox {
		-webkit-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		position: relative;
		cursor: pointer;
		background-color: white;
	}

	.privateCheckBox:checked {
		background-color: #289e77;
		border: 1px solid #d9d9d9;
	}

	.privateCheckBox:checked::after {
		content: "";
		position: absolute;
		top: 36%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		width: 4px;
		height: 7px;
		border: solid #fff;
		border-width: 0 2px 2px 0;
	}

	.privateNotice {
		font-size: 14px;
	}

	.letterPasswordInput {
		background-color: #fff;
		align-items: center;
		border-radius: 10px;
		width: 100%;
		min-height: 40px;
		border: none;
		font-size: 16px;
		outline: none;
		padding: 0 16px;
	}

	.warningMessage {
		width: 100%;
		font-size: 12px;
		color: #cb3232;
		margin-top: 5px;
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
