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
			throw new Error("Failed to fetch fireplace user data.");
		}
	} catch (error) {
		console.error("Error fetching fireplace user:", error);
		throw error;
	}
};
