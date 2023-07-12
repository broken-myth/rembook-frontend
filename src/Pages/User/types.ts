export interface SidebarVisibility {
	writtenRems: boolean;
	rembook: boolean;
}

export enum OverlayState {
	PROFILE,
	WRITTEN_REM,
	REM,
}

export interface User {
	_id: string;
	contact: string;
	dateOfBirth: Date;
	department: string;
	email: string;
	hostels: Hostel[];
	isProfileUpdated: boolean;
	image: string;
	isReqEmail: boolean;
	name: string;
	rollNumber: string;
	userBio: string;
	linkedin?: string;
	instagram?: string;
}

export interface Rem {
	from: string;
	fromID: string;
	isPrivate: boolean;
	to: string;
	toID: string;
	answers: Answer[];
	question: Question[];
	userImage: string;
	remImage: string;
}

type Hostel = {
	hostelName: string;
	roomNumber: string;
};

type Question = {
	id: number;
	question: string;
	_id: string;
};

type Answer = {
	answer: string;
	questionId: number;
};
