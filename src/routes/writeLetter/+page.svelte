<script lang="ts">
	let firePlaceOwner = '왼손의 흑염룡';

	const goBack = () => {
		window.history.back();
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		alert(`편지 작성이 완료 되었습니다!`);
	};
</script>

<div class="writeLetterPageContainer">
	<form onsubmit={handleSubmit} class="writeLetterContentsContainer">
		<p class="firePlaceOwnerName">to. {firePlaceOwner}</p>
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
			<button type="submit" class="submitBtn">작성 완료</button>
			<button type="button" class="closeBtn" onclick={goBack}>닫기</button>
		</div>
	</form>
</div>

<style>
	.writeLetterPageContainer {
		background-color: #114433;
		color: #fff;
		display: flex;
		align-items: start;
		justify-content: center;
		width: 100%;
		height: 100vh;
	}

	.writeLetterContentsContainer {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 50px;
	}

	.firePlaceOwnerName {
		width: 147px;
		height: 24px;
		font-size: 22px;
	}

	.nameInputWrapper {
		background-color: #fff;
		display: flex;
		align-items: center;
		gap: 4px;
		border-radius: 10px;
		width: 290px;
		height: 40px;
	}

	.suffix {
		color: #000;
		margin-left: 16px;
	}

	.nameInput {
		background-color: #fff;
		display: flex;
		align-items: center;
		gap: 4px;
		border-radius: 10px;
		width: 290px;
		height: 40px;
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
		width: 290px;
		height: 40px;
		border: none;
		font-size: 12px;
		padding-left: 16px;
		border-radius: 10px;
		outline: none;
	}

	.privateCheckWrapper {
		display: flex;
		gap: 10px;
	}

	.privateCheckBox {
		width: 15px;
		height: 15px;
		background-color: #289e77;
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
		width: 290px;
		height: 40px;
		border: none;
		font-size: 16px;
		outline: none;
		padding-left: 16px;
	}

	.warningMessage {
		width: 290px;
		font-size: 12px;
		color: #cb3232;
	}

	.btnContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.submitBtn {
		width: 290px;
		height: 40px;
		background-color: #ffe51e;
		color: #000;
		border-radius: 10px;
	}

	.closeBtn {
		width: 290px;
		height: 40px;
		color: #000;
		border-radius: 10px;
	}
</style>
