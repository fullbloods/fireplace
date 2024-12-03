<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { showModal } from "$lib/store/modalStore";
	import { passwordProps } from "$lib/store/password";
	import { passwordCheck } from "$lib/utils/passwordCheck";

	let { id } = $props();
	const user = $page.params.id;
	let password = $state("");

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		try {
			await passwordCheck(id, password);

			$passwordProps = password;

			goto(`/fireplace/${user}/letterbox/${id}`);

			showModal.set(false);
		} catch (err: any) {
			alert(err.response.data.message ?? "편지 데이터를 가져오는 중 오류가 발생했습니다.");
		}
	};

	const handleCloseModal = () => {
		showModal.set(false);
	};
</script>

{#if $showModal}
	<div class="backdrop">
		<form onsubmit={handleSubmit}>
			<div class="modal">
				<div class="nameText">{`전여친의 편지`}</div>
				<input
					class="customInput"
					name="password"
					type="password"
					bind:value={password}
					placeholder="비밀번호 입력"
				/>
				<div class="btnContainer">
					<button class="customBtn" onclick={handleCloseModal}>닫기</button>
					<button class="customColorBtn">확인</button>
				</div>
			</div>
		</form>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		z-index: 999;
	}

	.modal {
		width: 100%;
		height: 240px;
		background-color: #fff;
		padding: 30px 40px;
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
		height: 50px;
		border: none;
		box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.2);
		outline: none;
		padding: 0 20px;
		align-content: center;
		border-radius: 5px;
	}

	.customInput::placeholder {
		font-size: 16px;
		color: #a8a8a8;
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
