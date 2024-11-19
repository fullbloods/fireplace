<script lang="ts">
	import { goto } from '$app/navigation';

	const goBack = () => {
		window.history.back();
	};

	const goToReply = () => {
		goto('/fireplace/[id]/writing');
	};
</script>

<div class="container">
	<div class="detailInner">
		<div class="name"><span>from.{' '}</span>전여친</div>
		<div class="detail">내용</div>
	</div>
	<div class="btnContainer">
		<button class="customBtn" onclick={goBack}>닫기</button>
		<button class="customColorBtn" onclick={goToReply}>답장하기</button>
	</div>
</div>

<style>
	.container {
		background-color: #114433;
		width: 100%;
		height: 100vh;
		padding: 130px 45px 0 45px;
	}

	.detailInner {
		width: 100%;
		min-height: 200px;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px 30px;
	}

	.name {
		font-size: 20px;
		padding: 4px 5px;
		border-bottom: 1px solid #d9d9d9;
	}

	.name > span {
		font-size: 16px;
	}

	.detail {
		font-size: 20px;
		margin-top: 10px;
	}

	.btnContainer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.customBtn,
	.customColorBtn {
		width: 40%;
		height: 40px;
		background-color: #fff;
		border: none;
		border-radius: 10px;
		font-size: 18px;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}
</style>
