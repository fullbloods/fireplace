export interface Detail {
	uuid: string;
	fire: {
		uuid: string;
		name: string;
	};
	name: string;
	content: string;
	music: string | null;
	type: LetterType;
	reply: string | null;
	replyAt: string | null;
	replyMusic: string | null;
	createdAt: string;
	openAt: string;
	status: LetterStatus;
	read: boolean;
}

export enum LetterType {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE"
}

export enum LetterStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}
