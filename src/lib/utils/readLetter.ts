import type { Detail } from "$lib/types/DetailType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const readLetter = async (uuid: string, password: string): Promise<Detail> => {
	try {
		const response = await axios.post(`${API_URL}/letter/${uuid}/get`, {
			password
		});
		return response.data.data;
	} catch (error) {
		console.error("편지 상세 내용 가져오기 실패", error);
		throw new Error("편지 상세 내용 가져오기 실패");
	}
};
