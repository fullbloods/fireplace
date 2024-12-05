<script lang="ts">
	import { goto } from "$app/navigation";
	import { showBottomSheet } from "$lib/store/modalStore";
	import BottomSheet from "$lib/components/LinkBottomSheet.svelte";
	import FireBox from "$lib/components/fireElement/FireBox.svelte";
	import { page } from "$app/stores";
	import { getFireplace } from "$lib/utils/FireplaceUtils";

	let src = "/images/letterImg.png";

	let data: { uuid: string; name: string } = $state({ uuid: "", name: "" });

	let longName = $state(false);

	const id = $page.params.id;

	const fetchData = async () => {
		try {
			const user = await getFireplace(id);

			data = user;
		} catch (err: any) {
			alert(err.response.data.message);
		}
	};

	const nameLength = () => {
		if (data.name.length > 7) {
			longName = true;
		}
	};

	$effect(() => {
		if (id == null || id == undefined) {
			goto("/");
		}
	});

	$effect(() => {
		fetchData();
		nameLength();
	});

	const goToCreateFireplace = () => {
		goto("/create");
	};

	const goToWriting = () => goto(`/fireplace/${data.uuid}/writing`);

	const goToLetterBox = () => goto(`/fireplace/${data.uuid}/letterbox`);

	const handleOpenBottomSheet = () => showBottomSheet.set(true);
</script>

<div class="container">
	<div class="letterContainer">
		<div class="letterTitle">편지함</div>
		<button class="letterButton" onclick={goToLetterBox}>
			<img {src} alt="편지함" />
		</button>
	</div>
	<div class="name" class:longName>{data.name}의 벽난로</div>
	<FireBox isMain={true} />
	<div class="btnContainer">
		<button class="customColorBtn" onclick={goToWriting}>
			<img {src} alt="편지" />따뜻한 편지 남기기
		</button>
		<button class="customBtn" onclick={goToCreateFireplace}>🔥 나의 벽난로 만들기</button>
		<button class="customBtn" onclick={handleOpenBottomSheet}>🔗 내 벽난로 공유하기</button>
	</div>
	{#if $showBottomSheet}
		<BottomSheet />
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #114433;
		padding: 30px 10%;
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
		margin-bottom: 4px;
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
		margin-top: 30px;
		white-space: nowrap;
	}

	.longName {
		font-size: 30px;
	}

	.btnContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: auto;
		z-index: 1;
		position: fixed;
		bottom: 3vh;
		left: 0;
		padding: 0 10%;
	}

	.customBtn,
	.customColorBtn {
		width: 100%;
		height: 48px;
		border-radius: 8px;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		color: #000;
		border: none;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}

	.customColorBtn > img {
		width: 25px;
		height: 20px;
		margin-right: 10px;
	}
</style>
