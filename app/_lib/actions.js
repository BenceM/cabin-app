"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function updateProfile(formData) {
	const session = await auth();
	if (!session) throw new Error("User not authenticated");

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");
	const regex = /^[a-zA-Z0-9]{6,12}$/;
	if (!regex.test(nationalID)) throw new Error("Invalid national ID");
	const updateData = { nationality, countryFlag, nationalID };

	const { error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if (error) throw new Error("Guest could not be updated");
	revalidatePath("/accont/profile");
}

export async function deleteReservation(bookingId) {
	const session = await auth();
	if (!session) throw new Error("User not authenticated");

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);
	if (!guestBookingIds.includes(bookingId))
		throw new Error("You don't have the permission to delete this booking");
	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) throw new Error("Booking could not be deleted");
	revalidatePath("/accont/reservations");
}

export async function signInAction() {
	// change to loop over api/auth/providers
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
