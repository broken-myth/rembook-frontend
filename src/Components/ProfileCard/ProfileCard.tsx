import Avatar from "../../public/avatar.png";

const ProfileCard = (props: any) => {
	let image = props.image;

	if (image == undefined) {
		image = Avatar;
	}

	return (
		<div className="p-1 m-5 rounded-xl bg-green transition duration-300 ease-in-out hover:scale-105 h-[300px] hover:cursor-pointer">
			<div className="flex m-1 justify-center">
				<img
					src={image}
					className="items-center rounded-xl h-[150px] object-cover"
				/>
			</div>
			<p
				className="m-4 text-center text-black"
				style={{ fontWeight: "700" }}
			>
				{props.name}
			</p>
			{props.dept && props.dept.length > 0 && (
				<div className="m-4 text-black text-center">
					Dept: {props.dept}
				</div>
			)}
			{props.userBio && props.userBio.length > 0 && (
				<div className="m-4 overflow-auto h-[2.5rem] text-black">
					Bio: {props.userBio}
				</div>
			)}
			<div className="m-4 overflow-auto h-[2.5rem] text-black">
				{props.userBio}
			</div>
		</div>
	);
};

export default ProfileCard;
