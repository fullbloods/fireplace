<script lang="ts">
	import { goto } from "$app/navigation";
	let src = "/images/homeImg.png";

	const goToCreateFireplace = () => {
		goto("/create");
	};
</script>

<div class="container">
	<img {src} alt="눈 배경" class="snowImg" />
	<div class="content">
		<div class="title">벽난로 만들기</div>
		<button class="createBtn" onclick={goToCreateFireplace}>🔥 나의 벽난로 만들기</button>
	</div>
	<div class="snsText">
		문의 : <a
			href="https://www.instagram.com/fire_placexx"
			target="_blank"
			class="instagramContainer"
			><img
				src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008788/noticon/bqjhb6xvljt9viccy6lh.png"
				alt="벽난로 인스타그램"
			/>fire_placexx</a
		>
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
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 50px;
		padding: 20px 80px;
	}

	.snowImg {
		width: 100%;
		height: auto;
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
		width: 100%;
		color: #aaaaaa;
		font-size: 12px;
		display: flex;
		gap: 16px;
		margin-bottom: 16px;
		justify-content: center;
	}

	.snsText > a {
		color: #aaaaaa;
		text-decoration: none;
	}

	.instagramContainer {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.instagramContainer > img {
		width: 14px;
		height: 14px;
	}
</style>
