import type { LetterCreateDto } from "$lib/types/LetterType";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const writingLetter = async (uuid: string, dto: LetterCreateDto): Promise<void> => {
	await axios.post(`${API_URL}/fire/${uuid}/letter`, dto);
};
