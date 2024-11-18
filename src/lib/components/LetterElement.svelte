<script lang="ts">
	export let letter: {
		id: number;
		name: string;
		day: number;
		private: boolean;
	};

	let src: string = '/images/letterImg.png';
</script>

<div class="letterInner">
	<img {src} alt="편지" />
	<div class="nameText">{letter.name}</div>
	<div class="dayText">{`D-${letter.day}`}</div>
	<div class="private">
		{#if letter.private}
			🔒
		{/if}
	</div>
</div>

<style>
	.letterInner {
		width: 100%;
		height: 50px;
		background-color: #fff;
		border-radius: 10px;
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding: 0 20px;
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
