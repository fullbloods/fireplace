import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const passwordCheck = async (uuid: string, password: string): Promise<void> => {
	await axios.post(`${API_URL}/letter/${uuid}/cert`, { password });
};
