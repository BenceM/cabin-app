"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
	const session = await auth();

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
	revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
	const session = await auth();
	if (!session) throw new Error("User not authenticated");
	// ADD SECURITY CHECK FOR DUPLICATE BOOKING
	// Object.entries(formData.entries())
	const newBooking = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		status: "unconfirmed",
		isPaid: false,
		hasBreakfast: false,
	};

	const { error } = await supabase.from("bookings").insert([newBooking]);

	if (error) throw new Error("Booking could not be created");
}

export async function deleteBooking(bookingId) {
	//Authentication
	const session = await auth();
	if (!session) throw new Error("User not authenticated");
	//Authorization
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);
	if (!guestBookingIds.includes(bookingId))
		throw new Error("You don't have the permission to delete this booking");
	//deletion
	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) throw new Error("Booking could not be deleted");
	//cache refresh
	revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
	const bookingId = Number(formData.get("bookingId"));

	const session = await auth();
	if (!session) throw new Error("User not authenticated");

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);
	if (!guestBookingIds.includes(bookingId))
		throw new Error("You don't have the permission to update this booking");
	const updateData = {
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
	};
	const { error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId);

	if (error) throw new Error("Booking could not be deleted");
	//cache revalidation for parent and child
	revalidatePath("/account/reservations");
	revalidatePath(`/account/reservations/edit/${bookingId}`);

	redirect("/account/reservations");
}

export async function signInAction() {
	// change to loop over api/auth/providers
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
