"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
export default function ReservationList({ bookings }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		() => {},
	);

	async function handleDelete({ bookingId }) {
		deleteReservation(bookingId);
	}
	return (
		<ul className="space-y-6">
			{bookings.map((booking) => (
				<ReservationCard
					onDelete={handleDelete}
					booking={booking}
					key={booking.id}
				/>
			))}
		</ul>
	);
}
