"use client";

import Image from "next/image";
import { updateProfile } from "../_lib/actions";
import FormButton from "./FormButton";

function UpdateProfileForm({ guest, children }) {
	const { fullName, email, nationality, nationalID, countryFlag } = guest;

	return (
		<form
			action={updateProfile}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
		>
			<div className="space-y-2">
				<label>Full name</label>
				<input
					name="fullName"
					disabled
					defaultValue={fullName}
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					name="email"
					disabled
					defaultValue={email}
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					{countryFlag && (
						<Image
							src={countryFlag}
							alt="Country flag"
							className="h-5 rounded-sm"
							width={24}
							height={12}
						/>
					)}
				</div>
				{children}
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					defaultValue={nationalID ?? ""}
					name="nationalID"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="flex justify-end items-center gap-6">
				<FormButton>Update Profile</FormButton>
			</div>
		</form>
	);
}

export default UpdateProfileForm;
