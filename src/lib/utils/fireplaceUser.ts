import axios from "axios";
import { PUBLIC_API_SERVER } from "$env/static/public";

export interface FireplaceUser {
	uuid: string;
	name: string;
}

export const fetchFireplaceUser = async (uuid: string): Promise<FireplaceUser> => {
	try {
		const response = await axios.get(`${PUBLIC_API_SERVER}/fire/${uuid}`);
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
