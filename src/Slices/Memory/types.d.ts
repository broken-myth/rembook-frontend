interface MemoryState {
	isFetching: boolean;
	questions: [];
}

interface APIError {
	message: string;
}

interface IUpdateRem {
	to: string;
	questions: string;
	answer: any;
	image: File | undefined;
}

interface RemResponse {
	message: string;
}

interface QuestionResponse {
	message: string | null;
	question: any | null;
}

interface Questions {
	id: string;
	questions: any;
}

interface MemoryPairResponse {
	message: string | null;
	data: any | null;
}
