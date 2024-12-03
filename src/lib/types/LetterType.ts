export interface Letter {
	uuid: string;
	name: string;
	diffDate: number;
	type: LetterType;
	status: LetterStatus;
}

export enum LetterType {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE"
}

export enum LetterStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED"
}
