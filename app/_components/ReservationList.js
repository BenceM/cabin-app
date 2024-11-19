"use client";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
export default function ReservationList({ bookings }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		() => {},
	);
	return (
		<ul className="space-y-6">
			{bookings.map((booking) => (
				<ReservationCard booking={booking} key={booking.id} />
			))}
		</ul>
	);
}
