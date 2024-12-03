import type { Letter, LetterCreateDto, LetterItem, LetterReplyDto } from "$lib/types/LetterType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getLetters = async (uuid: string): Promise<LetterItem[]> => {
	const { data } = await axios.get(`${API_URL}/fire/${uuid}/letter`);

	return data.data;
};

export const getLetter = async (uuid: string, password?: string): Promise<Letter> => {
	const { data } = await axios.post(`${API_URL}/letter/${uuid}/get`, {
		password
	});

	return data.data;
};

export const writingLetter = async (uuid: string, dto: LetterCreateDto): Promise<void> => {
	await axios.post(`${API_URL}/fire/${uuid}/letter`, dto);
};

export const replyLetter = async (uuid: string, dto: LetterReplyDto): Promise<void> => {
	await axios.post(`${API_URL}/letter/${uuid}/reply`, dto);
};
