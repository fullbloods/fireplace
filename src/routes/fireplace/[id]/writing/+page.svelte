<script lang="ts">
	import { onMount } from 'svelte';
	import { showBottomSheet } from '$lib/store/modalStore';
	import BottomSheet from '$lib/components/WritingBottomSheet.svelte';

	let firePlaceOwner = '왼손의 흑염룡';
	let shortHeight = $state(false);

	let formData = $state({
		name: '',
		content: '',
		private: false,
		password: '',
		date: ''
	});

	const handleOpenBottomSheet = () => {
		showBottomSheet.set(true);
	};

	const goBack = () => {
		window.history.back();
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		console.log('저장될 편지 내용', $state.snapshot(formData));
		alert('편지 작성이 완료되었습니다!');
		showBottomSheet.set(false);
	};

	const checkHeight = () => {
		shortHeight = window.innerHeight <= 670;
	};

	onMount(() => {
		checkHeight();
		window.addEventListener('resize', checkHeight);

		return () => {
			window.removeEventListener('resize', checkHeight);
		};
	});
</script>

<form onsubmit={handleSubmit}>
	<div class="container">
		<p class="toName">To.{' '}{firePlaceOwner}</p>
		<div class="nameInputWrapper">
			<span class="suffix">from. </span>
			<input type="text" class="nameInput" placeholder="이름 입력" bind:value={formData.name} />
		</div>
		<textarea class="letterContent" placeholder="편지 내용" bind:value={formData.content}
		></textarea>
		<input
			type="text"
			class="musicLinkInput"
			placeholder="들려주고 싶은 노래의 유튜브 링크를 적어주세요"
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
		<BottomSheet {formData} />
	{/if}
</form>

<style>
	.container {
		background-color: #114433;
		color: #fff;
		width: 100%;
		height: 100vh;
		padding: 50px;
		display: flex;
		flex-direction: column;
		gap: 20px;
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
		content: '';
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
