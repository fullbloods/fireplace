<script lang="ts">
	import { goto } from "$app/navigation";
	import { showBottomSheet } from "$lib/store/modalStore";
	import BottomSheet from "$lib/components/LinkBottomSheet.svelte";
	import FireBox from "$lib/components/fireElement/FireBox.svelte";
	import { page } from "$app/stores";
	import { getFireplace } from "$lib/utils/FireplaceUtils";

	let src = "/images/letterImg.png";
	let instaIcon =
		"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iaWNvbi1laS1zYy1pbnN0YWdyYW0tMSIgZmlsbD0iI2ZmZmZmZiI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMjUgMTJjLTMuNTMgMC0zLjk3My4wMTUtNS4zNi4wNzgtMS4zODQuMDYzLTIuMzI5LjI4My0zLjE1Ni42MDRhNi4zNzIgNi4zNzIgMCAwIDAtMi4zMDIgMS41IDYuMzcyIDYuMzcyIDAgMCAwLTEuNSAyLjMwM2MtLjMyMS44MjYtLjU0IDEuNzcxLS42MDQgMy4xNTVDMTIuMDE1IDIxLjAyNyAxMiAyMS40NyAxMiAyNWMwIDMuNTMuMDE1IDMuOTczLjA3OCA1LjM2LjA2MyAxLjM4NC4yODMgMi4zMjkuNjA0IDMuMTU1LjMzMy44NTUuNzc3IDEuNTggMS41IDIuMzAzYTYuMzcyIDYuMzcyIDAgMCAwIDIuMzAyIDEuNWMuODI3LjMyIDEuNzcyLjU0IDMuMTU2LjYwNCAxLjM4Ny4wNjMgMS44My4wNzggNS4zNi4wNzggMy41MyAwIDMuOTczLS4wMTUgNS4zNi0uMDc4IDEuMzg0LS4wNjMgMi4zMjktLjI4MyAzLjE1NS0uNjA0YTYuMzcxIDYuMzcxIDAgMCAwIDIuMzAzLTEuNSA2LjM3MiA2LjM3MiAwIDAgMCAxLjUtMi4zMDNjLjMyLS44MjYuNTQtMS43NzEuNjA0LTMuMTU1LjA2My0xLjM4Ny4wNzgtMS44My4wNzgtNS4zNiAwLTMuNTMtLjAxNS0zLjk3My0uMDc4LTUuMzYtLjA2My0xLjM4NC0uMjgzLTIuMzI5LS42MDUtMy4xNTVhNi4zNzIgNi4zNzIgMCAwIDAtMS40OTktMi4zMDMgNi4zNzEgNi4zNzEgMCAwIDAtMi4zMDMtMS41Yy0uODI2LS4zMi0xLjc3MS0uNTQtMy4xNTUtLjYwNEMyOC45NzMgMTIuMDE1IDI4LjUzIDEyIDI1IDEybTAgMi4zNDJjMy40NzEgMCAzLjg4Mi4wMTQgNS4yNTMuMDc2IDEuMjY3LjA1OCAxLjk1Ni4yNyAyLjQxNC40NDguNjA3LjIzNiAxLjA0LjUxNyAxLjQ5NS45NzIuNDU1LjQ1NS43MzYuODg4Ljk3MiAxLjQ5NS4xNzguNDU4LjM5IDEuMTQ2LjQ0OCAyLjQxNC4wNjIgMS4zNy4wNzYgMS43ODIuMDc2IDUuMjUzcy0uMDE0IDMuODgyLS4wNzYgNS4yNTNjLS4wNTggMS4yNjgtLjI3IDEuOTU2LS40NDggMi40MTRhNC4wMjggNC4wMjggMCAwIDEtLjk3MiAxLjQ5NSA0LjAyNyA0LjAyNyAwIDAgMS0xLjQ5NS45NzJjLS40NTguMTc4LTEuMTQ3LjM5LTIuNDE0LjQ0OC0xLjM3LjA2Mi0xLjc4Mi4wNzYtNS4yNTMuMDc2cy0zLjg4My0uMDE0LTUuMjUzLS4wNzZjLTEuMjY4LS4wNTgtMS45NTYtLjI3LTIuNDE0LS40NDhhNC4wMjcgNC4wMjcgMCAwIDEtMS40OTUtLjk3MiA0LjAzIDQuMDMgMCAwIDEtLjk3Mi0xLjQ5NWMtLjE3OC0uNDU4LS4zOS0xLjE0Ni0uNDQ4LTIuNDE0LS4wNjItMS4zNy0uMDc2LTEuNzgyLS4wNzYtNS4yNTNzLjAxNC0zLjg4Mi4wNzYtNS4yNTNjLjA1OC0xLjI2OC4yNy0xLjk1Ni40NDgtMi40MTQuMjM2LS42MDcuNTE3LTEuMDQuOTcyLTEuNDk1YTQuMDI4IDQuMDI4IDAgMCAxIDEuNDk1LS45NzJjLjQ1OC0uMTc4IDEuMTQ2LS4zOSAyLjQxNC0uNDQ4IDEuMzctLjA2MiAxLjc4Mi0uMDc2IDUuMjUzLS4wNzYiPjwvcGF0aD48cGF0aCBkPSJNMjUgMThhNyA3IDAgMSAwIDAgMTQgNyA3IDAgMCAwIDAtMTRtMCAxMS41YTQuNSA0LjUgMCAxIDEgMC05IDQuNSA0LjUgMCAwIDEgMCA5bTguNy0xMS40YTEuNiAxLjYgMCAxIDEtMy4yIDAgMS42IDEuNiAwIDAgMSAzLjIgMCI+PC9wYXRoPjwvZz48L3N2Zz4=";
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
		<a href="https://www.instagram.com/fire_placexx/" target="_blank">
			<img src={instaIcon} alt="인스타그램" class="instaIcon" /></a
		>
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

	.instaIcon {
		left: 0;
		top: 0;
		position: absolute;
		width: 50px;
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
