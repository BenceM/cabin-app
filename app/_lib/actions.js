"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData) {
	const session = await auth();
	if (!session) throw new Error("User not authenticated");

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");
	const regex = /^[a-zA-Z0-9]{6,12}$/;
	if (!regex.test(nationalID)) throw new Error("Invalid national ID");
	const updateData = { nationality, countryFlag, nationalID };

	const { data, error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if (error) throw new Error("Guest could not be updated");
}

export async function signInAction() {
	// change to loop over api/auth/providers
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
