import type { Create } from "$lib/types/CreateType";
import type { Fireplace } from "$lib/types/FireplaceType";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createFireplace = async (payload: Create): Promise<{ uuid: string }> => {
	const { data } = await axios.post(`${API_URL}/fire`, payload);

	return data.data;
};

export const getFireplace = async (uuid: string): Promise<Fireplace> => {
	const { data } = await axios.get(`${API_URL}/fire/${uuid}`);

	return data.data;
};
