import { useState } from "react";

import { Toast } from "../../Components";
import { getAllRems, updateRem } from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import { CustomAxios } from "../../Utils";

const UserDashboard = () => {
	const dispatch = useAppDispatch();
	const [questionId, setQuestionId] = useState<string>("");

	const getRems = async () => {
		const getRemsDispatch = await dispatch(getAllRems());

		if (getAllRems.fulfilled.match(getRemsDispatch)) {
			console.log(getRemsDispatch.payload);
		} else {
			if (getRemsDispatch.payload?.message)
				Toast("toastRed", "Oops!", getRemsDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const getQuestions = async () => {
		await CustomAxios.get("/getQuestions", { withCredentials: true })
			.then((res) => {
				setQuestionId(res.data.id);
			})
			.catch(() => Toast("toastRed", "Oops!", "Unable to Get Questions"));
	};

	const updateUserRem = async () => {
		const updateUserRemDispatch = await dispatch(
			updateRem({
				to: "6449323a79ab25785d3dc8fd",
				questions: questionId,
				answer: JSON.stringify([
					{ answer: "finally a rem", questionId: 1 },
				]),
				image: undefined,
			})
		);

		if (updateRem.fulfilled.match(updateUserRemDispatch)) {
			console.log(updateUserRemDispatch.payload.message);
		} else {
			if (updateUserRemDispatch.payload?.message)
				Toast(
					"toastRed",
					"Oops!",
					updateUserRemDispatch.payload.message
				);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	return (
		<div>
			User Dashboard
			<button
				onClick={() => {
					getRems();
					getQuestions();
				}}
			>
				Hit me
			</button>
			<button
				onClick={() => {
					updateUserRem();
				}}
			>
				{" "}
				Update a Rem
			</button>
		</div>
	);
};

export default UserDashboard;
