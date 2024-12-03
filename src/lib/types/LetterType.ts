export interface LetterItem {
	uuid: string;
	name: string;
	diffDate: number;
	type: LetterType;
	status: LetterStatus;
}

export interface LetterCreateDto {
	name: string;
	content: string;
	music: string | null;
	private: boolean;
	password: string;
	openAt: string;
}

export interface Letter {
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

export interface LetterReplyDto {
	message: string;
	music: string | null;
	password: string;
}

export enum LetterType {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE"
}

export enum LetterStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}
