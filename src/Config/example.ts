interface IConfig {
	backend_url: string;
	client_id: string;
	redirect_uri: string;
	response_type: string;
	grant_type: string;
	state: string;
	scope: string;
	nonce: string;
	site_key: string;
	env: "development" | "production";
}

const config: IConfig = {
	backend_url: "http://127.0.0.1",
	client_id: "",
	redirect_uri: "",
	response_type: "code",
	grant_type: "authorization_code",
	state: "",
	scope: "email+openid+profile+user",
	nonce: "",
	site_key: "",
	env: "development",
};

export default config;
