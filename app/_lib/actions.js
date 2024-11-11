"use server";

import { signIn } from "./auth";

export async function signInAction() {
	// change to loop over api/auth/providers
	await signIn("google", { redirectTo: "/account" });
}
