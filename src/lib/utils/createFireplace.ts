import axios from "axios";
import { PUBLIC_API_SERVER } from "$env/static/public";

export interface CreateFireplacePayload {
	name: string;
	password: string;
}

export const createFireplace = async (
	payload: CreateFireplacePayload
): Promise<{ uuid: string }> => {
	try {
		const response = await axios.post(`${PUBLIC_API_SERVER}/fire`, payload);
		return response.data.data;
	} catch (error) {
		console.error("벽난로 생성 중 오류가 발생했습니다.", error);
		throw new Error("벽난로 생성 중 오류가 발생했습니다.");
	}
};
