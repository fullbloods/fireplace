import type { FireplaceUser } from "$lib/types/UserType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchFireplaceUser = async (uuid: string): Promise<FireplaceUser> => {
	try {
		const response = await axios.get(`${API_URL}/fire/${uuid}`);
		if (response.data.success) {
			return response.data.data;
		} else {
			throw new Error("데이터를 가져오는데 실패했습니다.");
		}
	} catch (error) {
		console.error("데이터를 가져오는데 실패했습니다.", error);
		throw error;
	}
};
