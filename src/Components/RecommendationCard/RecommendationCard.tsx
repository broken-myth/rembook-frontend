import { Image } from "@mantine/core";

import { RecommendationCardProps } from "./types";

const RecommendationCard: React.FC<RecommendationCardProps> = ({
	imgUrl,
	name,
}) => {
	return (
		<div className="mx-auto w-[200px] h-[300px] bg-white p-0 relative shadow-lg">
			<Image src={imgUrl} width={200} height={300} />
			<div className="h-full w-full bg-gradient-to-b from-gray-950 to-black opacity-30 absolute top-0 left-0"></div>
			<p className="text-center text-white font-medium text-[1rem] md:text-[1.5rem] xl:text-[1rem] absolute bottom-4 left-[50%] -translate-x-[50%] max-w-[90%] overflow-clip  text-ellipsis">
				{name}
			</p>
		</div>
	);
};

export default RecommendationCard;
