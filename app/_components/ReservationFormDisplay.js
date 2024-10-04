"use client";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { useAuth } from "./AuthContext";

function ReservationFormDisplay({ cabin }) {
	const session = useAuth();

	return session?.user ? (
		<ReservationForm cabin={cabin} user={session.user} />
	) : (
		<LoginMessage />
	);
}

export default ReservationFormDisplay;
