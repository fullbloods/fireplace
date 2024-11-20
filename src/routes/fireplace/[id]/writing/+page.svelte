<script lang="ts">
	let firePlaceOwner = '왼손의 흑염룡';
	let showBottomSheet = false;

	const goBack = () => {
		window.history.back();
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		// alert('편지 작성이 완료되었습니다!');
	};

	const openBottonSheet = () => {
		showBottomSheet = true;
	};

	const closeBottomSheet = () => {
		showBottomSheet = false;
	};
</script>

<form onsubmit={handleSubmit}>
	<div class="container">
		<p class="toName">To.{' '}{firePlaceOwner}</p>
		<div class="nameInputWrapper">
			<span class="suffix">from. </span>
			<input type="text" class="nameInput" placeholder="이름 입력" />
		</div>
		<textarea class="letterContent" placeholder="편지 내용"></textarea>
		<input
			type="text"
			class="musicLinkInput"
			placeholder="들려주고 싶은 노래의 유튜브 링크를 적어주세요"
		/>
		<div class="privateCheckWrapper">
			<input type="checkbox" class="privateCheckBox" />
			<p class="privateNotice">비공개(벽난로 주인만 볼 수 있습니다.)</p>
		</div>
		<input type="password" class="letterPasswordInput" placeholder="편지 비밀번호" />
		<p class="warningMessage">
			욕설 및 음란물, 타인의 명예를 훼손하는 내용과 사용자에게 피해를 줄 수 있는 음악은 관리자에
			의해 삭제될 수 있으며, 수가기관의 요청이 있을 경우 관련자료를 제출할 수 있습니다.
		</p>
		<div class="btnContainer">
			<button type="button" class="customColorBtn" onclick={openBottonSheet}>작성 완료</button>
			<button type="button" class="customBtn" onclick={goBack}>닫기</button>
		</div>
	</div>

	{#if showBottomSheet}
		<div class="bottomSheet">
			<div class="bottomSheetContent">
				<div class="bottomSheetText">벽난로 주인이 언제 편지를 읽었으면 좋겠어요?</div>
				<input type="date" placeholder="비밀번호 입력" class="dateCustomInput" />
				<div class="sheetBtnContainer">
					<button class="sheetCloseBtn" onclick={closeBottomSheet}>취소</button>
					<button class="sheetSubmitBtn" onclick={closeBottomSheet} type="submit">확인</button>
				</div>
			</div>
		</div>
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
		height: 40px;
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
		height: 200px;
		padding: 16px;
		font-size: 18px;
		border-radius: 10px;
		resize: none;
		outline: none;
	}

	.musicLinkInput {
		width: 100%;
		height: 40px;
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
		display: flex;
		align-items: center;
		gap: 4px;
		border-radius: 10px;
		width: 100%;
		height: 40px;
		border: none;
		font-size: 16px;
		outline: none;
		padding-left: 16px;
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

	.customBtn,
	.customColorBtn {
		width: 100%;
		height: 40px;
		color: #000;
		border-radius: 10px;
		background-color: #fff;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}

	.bottomSheet {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.bottomSheetContent {
		width: 100%;
		height: 400px;
		background: white;
		border-radius: 20px 20px 0 0;
		padding: 30px 70px;
		text-align: center;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.3s ease-out;
	}

	.bottomSheetText {
		font-size: 16px;
		margin: 20px 0 50px 0;
	}

	.dateCustomInput {
		width: 100%;
		height: 45px;
		padding: 10px;
		margin: 10px 0;
		font-size: 16px;
		border: none;
		box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.25);
		border-radius: 5px;
	}

	.sheetBtnContainer {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
	}

	.sheetSubmitBtn,
	.sheetCloseBtn {
		flex: 1;
		height: 40px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-right: 20px;
		color: #000;
		background-color: #dcdcdc;
	}

	.sheetSubmitBtn {
		background: #ffe51e;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
