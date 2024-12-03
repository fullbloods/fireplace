<script lang="ts">
	import { onMount } from "svelte";
	import { showBottomSheet } from "$lib/store/modalStore";
	import BottomSheet from "$lib/components/WritingBottomSheet.svelte";
	import { goto } from "$app/navigation";
	import axios from "axios";

	let firePlaceOwner = "왼손에 흑염룡";
	let shortHeight = $state(false);
	let formData = $state({
    name: "",
    content: "",
    private: false,
    password: "",
    date: "",
    music: ""
});

	const handleOpenBottomSheet = () => {
		if (!formData.name.trim()) {
			alert("이름을 입력해주세요.");
			return;
		} else if (!formData.content.trim()) {
			alert("내용을 적어주세요.");
			return;
		}
		showBottomSheet.set(true);
	};

	const goBack = () => {
		window.history.back();
	};

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		if (!formData.name.trim()) {
			alert("이름을 입력해주세요.");
			return;
		} else if (!formData.content.trim()) {
			alert("내용을 적어주세요.");
			return;
		} else if (!formData.date.trim()) {
			alert("날짜를 입력해주세요.");
			return;
		}

		const musicId = extractVideoId(formData.music);
		if (formData.music && !extractVideoId(formData.music)) {
			alert("유효한 유튜브 링크를 입력해주세요.");
			return;
	}
		
		const payload = {
			name: formData.name,
			content: formData.content,
			music: musicId ? `https://youtu.be/${musicId}` : null,
			private: formData.private,
			password: formData.password,
			openAt: formData.date
		};

		try {
		const response = await axios.post("http://localhost:8070", payload);

		if (response.status === 200) {
			alert("편지가 성공적으로 저장되었습니다!");
			showBottomSheet.set(true);
			goto("/fireplace/[id]");
		} else {
			alert("편지 저장 중 오류가 발생했습니다.");
		}
	} catch (error) {
		alert("서버와 통신 중 오류가 발생했습니다.");
		console.log(error);
	}
};

	const checkHeight = () => {
		shortHeight = window.innerHeight <= 670;
	};

	onMount(() => {
    checkHeight();
    window.addEventListener("resize", checkHeight);

    return () => {
        window.removeEventListener("resize", checkHeight);
    };
});


	const extractVideoId = (url: string): string | null => {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
		const match = url.match(regex);
		return match ? match[1] : null;
	};
</script>

<form onsubmit={handleSubmit}>
	<div class="container" class:shortContainer={shortHeight}>
		<p class="toName">To.{" "}{firePlaceOwner}</p>
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
			<input type="checkbox" class="privateCheckBox" bind:checked={formData.private} />
			<p class="privateNotice">비공개(벽난로 주인만 볼 수 있습니다.)</p>
		</div>
		<input
			type="password"
			class="letterPasswordInput"
			placeholder="편지 비밀번호"
			bind:value={formData.password}
		/>
		<div class="btnContainer" class:shortHeightStyle={shortHeight}>
			<button type="submit" class="customColorBtn">작성 완료</button>
			<button type="button" class="customBtn" onclick={goBack}>닫기</button>
		</div>
	</div>

	{#if $showBottomSheet}
		<BottomSheet {formData} />
	{/if}
</form>

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
		background-color: #289e77;
		position: relative;
		cursor: pointer;
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
