import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
	const [bookedDates, settings] = await Promise.all([
		getBookedDatesByCabinId(cabin.id),
		getSettings(),
	]);
	return (
		<div className="grid grid-cols-2 border-primary-800 min-h-[400px]">
			<DateSelector
				bookedDates={bookedDates}
				settings={settings}
				cabin={cabin}
			/>
			<ReservationForm cabin={cabin} />
		</div>
	);
}

export default Reservation;
