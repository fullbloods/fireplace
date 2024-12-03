export interface Letter {
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

export enum LetterType {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE"
}

export enum LetterStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}
