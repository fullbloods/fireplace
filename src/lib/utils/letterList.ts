import type { Letter } from "$lib/types/LetterType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getLetter = async (uuid: string): Promise<Letter[]> => {
	try {
		const { data } = await axios.get(`${API_URL}/fire/${uuid}/letter`);
		if (data.success) {
			return data.data;
		} else {
			throw new Error("데이터를 가져오는데 실패했습니다.");
		}
	} catch (error) {
		console.error("데이터를 가져오는데 실패했습니다.", error);
		throw error;
	}
};
