import type { Password } from "$lib/types/PasswordType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const passwordCheck = async (uuid: string, password: string): Promise<Password> => {
	try {
		const response = await axios.post(`${API_URL}/letter/${uuid}/cert`, { password });
		return response.data.data;
	} catch (error) {
		console.error("비밀번호 서버 통신 실패", error);
		throw new Error("비밀번호 서버 통신 실패");
	}
};
