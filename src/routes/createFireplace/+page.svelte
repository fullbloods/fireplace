<script>
	let name = '';
	let password = '';

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="createFireplaceContainer">
	<form>
		<div class="customInputContainer">
			<input
				class="customInput"
				type="text"
				bind:value={name}
				maxlength="8"
				placeholder="이름(최대 8자)"
			/>
			<span class="suffix">의 벽난로</span>
		</div>
		<input class="customInput" type="password" bind:value={password} placeholder="비밀번호 입력" />
		<div class="btnContainer">
			<button class="customBtn" style="background-color: #FFE51E;">벽난로 만들기 완료</button>
			<button class="customBtn" onclick={goBack}>닫기</button>
		</div>
	</form>
</div>

<style>
	.createFireplaceContainer {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 100px 50px;
	}

	.customInputContainer {
		position: relative;
		width: 290px;
	}

	.customInput {
		width: 290px;
		height: 40px;
		padding-right: 80px;
		padding-left: 10px;
		border-radius: 10px;
		border: none;
		font-size: 18px;
		margin-bottom: 20px;
	}

	.suffix {
		position: absolute;
		right: 110px;
		top: 35%;
		transform: translateY(-50%);
		font-size: 18px;
		pointer-events: none;
	}

	.btnContainer {
		display: flex;
		flex-direction: column;
	}

	.customBtn {
		width: 290px;
		height: 40px;
		border-radius: 10px;
		border: none;
		margin-top: 20px;
		background-color: #fff;
		font-size: 18px;
		color: #000;
	}
</style>
