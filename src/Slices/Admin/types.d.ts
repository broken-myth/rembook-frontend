interface DauthCode {
	code: string | null;
}

interface Credentials {
	email: string;
	password: string;
	token: string;
}

interface UserState {
	loggedIn: boolean;
	isFetching: boolean;
	isUserFetching: boolean;
}

interface AuthResponse {
	data: string;
}

interface APIError {
	message: string;
}

interface IDetails {
	rollNumber: string;
	newEmail?: string;
}

interface IGetDetails {
	user: oldDetails;
}
