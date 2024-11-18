<script>
	let src = '/images/letterImg.png';

	let cnt = $state(0);
	let letters = [
		{
			id: 1,
			name: '전여친',
			day: 2,
			private: false
		},
		{
			id: 2,
			name: '전여친',
			day: 2,
			private: true
		},
		{
			id: 3,
			name: '전여친',
			day: 10,
			private: false
		}
	];

	cnt = letters.length;
</script>

<div class="container">
	<div class="title">편지함</div>
	<div class="letterCnt">{`전체 편지 : ${cnt}개`}</div>
	<div class="letterContainer">
		{#each letters as leter}
			<div class="letterInner">
				<img {src} alt="편지" />
				<div class="nameText">{leter.name}</div>
				<div class="dayText">{`D-${leter.day}`}</div>
				<div class="private">
					{#if leter.private === true}
						🔒
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 50px;
	}

	.title {
		color: #fff;
		font-size: 24px;
	}

	.letterCnt {
		color: #fff;
		font-size: 16px;
		margin-top: 20px;
	}

	.letterContainer {
		padding-top: 10px;
	}

	.letterInner {
		width: 100%;
		height: 50px;
		background-color: #fff;
		border-radius: 10px;
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding: 0 20px 0 20px;
	}

	.letterInner > img {
		width: 40px;
		height: 30px;
	}

	.nameText {
		font-size: 20px;
		margin-left: 20px;
	}

	.dayText {
		font-size: 14px;
		margin-left: auto;
	}

	.private {
		width: 14px;
		margin-left: 5px;
	}
</style>
