<script lang="ts">
	import { goto } from '$app/navigation';
	import FireCompo from '$lib/components/FireCompo.svelte';

	let name = '';
	let password = '';

	const goBack = () => {
		window.history.back();
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		alert(`${name}의 벽난로가 생성되었습니다!`);
		goto('/fireplace/[1]');
	};
</script>

<div class="container">
	<form onsubmit={handleSubmit}>
		<div class="customInputContainer">
			<div class="nameInputContainer">
				<input
					class="customNameInput"
					name="name"
					type="text"
					bind:value={name}
					maxlength="8"
					placeholder="이름(최대 8자)"
				/>
				<span class="suffix">의 벽난로</span>
			</div>
		</div>
		<input
			class="customInput"
			name="password"
			type="password"
			bind:value={password}
			placeholder="비밀번호 입력"
		/>
		<div class="btnContainer">
			<button type="button" class="customBtn" onclick={goBack}>닫기</button>
			<button type="submit" class="customColorBtn">벽난로 만들기 완료</button>
		</div>
	</form>
	<!-- <FireCompo /> -->
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 100px 50px;
	}

	.customInputContainer {
		width: 100%;
	}

	.customInput {
		width: 100%;
		height: 40px;
		padding: 0 16px;
		border-radius: 10px;
		border: none;
		font-size: 18px;
		margin-bottom: 20px;
		outline: none;
	}

	.nameInputContainer {
		width: 100%;
		height: 40px;
		display: flex;
		background-color: #fff;
		border-radius: 10px;
		padding: 0 16px;
		margin-bottom: 20px;
		font-size: 18px;
	}

	.customNameInput {
		width: 130px;
		border: none;
		outline: none;
		font-size: 18px;
	}
	.suffix {
		align-content: center;
	}

	.btnContainer {
		display: flex;
		flex-direction: column;
	}

	.customBtn,
	.customColorBtn {
		width: 100%;
		height: 40px;
		border-radius: 10px;
		border: none;
		margin-top: 20px;
		background-color: #fff;
		font-size: 18px;
		color: #000;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}
</style>
