interface DauthCode {
	code: string | null;
}

interface Credentials {
	email: string;
	password: string;
	token?: string;
}

interface UserState {
	loggedIn: boolean;
	isFetching: boolean;
	hasSecondaryCreds?: boolean;
	isSecodaryCredsVerified?: boolean;
	isProfileUpdated?: boolean;
	isFetchingSearch: boolean;
	isFetchingUser: boolean;
	hasSecondaryCreds?: boolean;
	isSecodaryCredsVerified?: boolean;
	isProfileUpdated?: boolean;
	department?: string;
	contact?: number;
	name?: string;
	dateOfBirth?: Date;
	hostelsList?: RoomNumber[];
	userBio?: string;
	rollNumber?: string;
	email?: string;
	linkedin?: string;
	instagram?: string;
	isOtherUserFetched: boolean;
}

interface AuthResponse {
	message: string;
	hasSecondaryCreds?: boolean;
	isSecodaryCredsVerified?: boolean;
	isProfileUpdated?: boolean;
	department?: string;
	contact?: number;
	name?: string;
	dateOfBirth?: Date;
	hostels?: RoomNumber[];
	userBio?: string;
	rollNumber?: string;
	email?: string;
	linkedin?: string;
	instagram?: string;
}

interface IProfile {
	department?: string;
	contact?: number;
	name?: string;
	dateOfBirth?: Date;
	hostels?: RoomNumber[];
	userBio?: string;
	rollNumber?: string;
	email?: string;
	linkedin?: string;
	instagram?: string;
}

interface SearchResponse {
	results: User[];
}

interface Query {
	query: string;
}

interface APIError {
	message: string;
}

interface IPassword {
	token: string;
	email: string;
	password: string;
	confirm: string;
	hash: string;
	code: number;
}

interface IReset {
	token: string;
	email: string | undefined;
}

interface IGetUser {
	user: IProfile;
	hasSecondaryCreds?: boolean;
	isSecodaryCredsVerified?: boolean;
	isProfileUpdated?: boolean;
	message: string;
}
interface UserResponse {
	message: string | null;
	user: any;
}

interface UserRequest {
	id: string | null;
}
