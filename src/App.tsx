import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from "react-redux";

import { Layout } from "./Components";
import config from "./Config";
import { store } from "./Store";
import { theme } from "./Utils";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<MantineProvider withNormalizeCSS theme={theme}>
				<GoogleReCaptchaProvider reCaptchaKey={config.site_key}>
					<NotificationsProvider
						position="bottom-right"
						autoClose={3000}
						zIndex={11000}
					>
						<Layout />
					</NotificationsProvider>
				</GoogleReCaptchaProvider>
			</MantineProvider>
		</Provider>
	);
};

export default App;
