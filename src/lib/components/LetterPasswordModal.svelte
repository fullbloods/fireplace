<script lang="ts">
	import { showModal } from '$lib/store/modalStore';

	const handleCloseModal = () => {
		showModal.set(false);
		console.log('닫힘', showModal);
	};
</script>

{#if $showModal}
	<div class="backdrop">
		<div class="modal">
			<div class="nameText">{`전여친의 편지`}</div>
			<input class="customInput" type="password" placeholder="비밀번호 입력" />
			<div class="btnContainer">
				<button class="customBtn" onclick={handleCloseModal}>닫기</button>
				<button class="customColorBtn">확인</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px;
	}

	.modal {
		width: 100%;
		height: 200px;
		background-color: #fff;
		padding: 30px 60px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.nameText {
		font-size: 20px;
		text-align: center;
	}

	.customInput {
		width: 100%;
		height: 30px;
		border: none;
		box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.25);
		outline: none;
		padding: 0 20px;
		align-content: center;
		border-radius: 5px;
	}

	.customInput::placeholder {
		font-size: 16px;
		color: #d9d9d9;
	}

	.btnContainer {
		display: flex;
		gap: 20px;
	}

	.customBtn,
	.customColorBtn {
		flex: 1;
		height: 30px;
		background-color: #dcdcdc;
		border: none;
		border-radius: 5px;
		font-size: 12px;
		color: #000;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}
</style>
