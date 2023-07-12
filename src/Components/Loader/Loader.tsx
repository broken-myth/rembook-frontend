import { Flex, Loader } from "@mantine/core";

const Loading = () => {
	return (
		<>
			<Flex
				align="center"
				direction="column"
				gap="xl"
				justify="center"
				className="w-screen h-full absolute"
			>
				<Loader
					z={10}
					color="#41EAD4"
					size="xl"
					variant="bars"
					style={{ scale: "2" }}
				/>
				<h5 className="text-turquoise mt-10">
					Authenticating...Hang On...
				</h5>
			</Flex>
		</>
	);
};

export default Loading;
