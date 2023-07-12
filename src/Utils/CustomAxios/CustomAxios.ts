/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import AppConfig from "../../Config";

const CustomAxios = axios.create({
	baseURL: AppConfig.backend_url,
	headers: {
		"Content-type": "application/json",
	},
});

export default CustomAxios;
