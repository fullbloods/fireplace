<script>
	import { goto } from '$app/navigation';

	let src = '/images/letterImg.png';

	const goToCreateFireplace = () => {
		goto('/create');
	};

	const goToLetterBox = () => {
		goto('/fireplace/[id]/letterbox');
	};
</script>

<div class="container">
	<div class="letterContainer">
		<div class="letterTitle">편지함</div>
		<button class="letterButton" on:click={goToLetterBox}>
			<img {src} alt="편지함" />
		</button>
	</div>
	<div class="name">왼손의 흑염룡의 벽난로</div>
	<div class="btnContainer">
		<button class="customBtn" style="background-color: #FFE51E;">
			<img {src} alt="편지" />따뜻한 편지 남기기
		</button>
		<button class="customBtn" on:click={goToCreateFireplace}>🔥 나의 벽난로 만들기</button>
		<button class="customBtn">🔗 내 벽난로 공유하기</button>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 30px 50px;
		display: flex;
		flex-direction: column;
	}

	.letterContainer {
		width: 100%;
		color: #fff;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		align-items: end;
		margin-top: 22px;
	}

	.letterTitle {
		width: 40px;
		text-align: center;
	}

	.letterButton {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.letterContainer img {
		width: 40px;
		height: 30px;
	}

	.name {
		font-size: 34px;
		color: #fff;
		text-align: center;
		margin-top: 70px;
	}

	.btnContainer {
		display: flex;
		flex-direction: column;
		margin-top: auto;
	}

	.customBtn {
		width: 100%;
		height: 48px;
		border-radius: 8px;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.customBtn > img {
		width: 25px;
		height: 20px;
		margin-right: 10px;
	}
</style>
