<script lang="ts">
	import { goto } from '$app/navigation';
	let src = '/images/homeImg.png';

	const goToCreateFireplace = () => {
		goto('/create');
	};
</script>

<div class="container">
	<img {src} alt="눈 배경" class="snowImg" />
	<div class="content">
		<div class="title">벽난로 만들기</div>
		<button class="createBtn" onclick={goToCreateFireplace}>🔥 나의 벽난로 만들기</button>
		<div class="snsText">
			문의 : <a href="https://www.instagram.com/g._.y_1232" target="_blank">fireplace_developer</a>
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		box-shadow:
			0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 50px;
		padding: 20px 80px;
	}

	.snowImg {
		width: 100%;
	}

	.title {
		font-size: 34px;
		text-align: center;
	}

	.createBtn {
		width: 100%;
		height: 82px;
		background-color: #ff6c6c;
		border: none;
		border-radius: 30px;
		font-size: 16px;
		color: #fff;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		display: flex;
	}

	.snsText {
		margin-top: auto;
		text-align: center;
		color: #aaaaaa;
		font-size: 12px;
	}

	.snsText > a {
		color: #aaaaaa;
		text-decoration: none;
	}
</style>
