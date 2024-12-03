import type { Create } from "$lib/types/CreateType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createFireplace = async (payload: Create): Promise<{ uuid: string }> => {
	try {
		const response = await axios.post(`${API_URL}/fire`, payload);
		return response.data.data;
	} catch (error) {
		console.error("벽난로 생성 중 오류가 발생했습니다.", error);
		throw new Error("벽난로 생성 중 오류가 발생했습니다.");
	}
};
