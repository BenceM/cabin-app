import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { useAuth } from "./AuthContext";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
	const [bookedDates, settings] = await Promise.all([
		getBookedDatesByCabinId(cabin.id),
		getSettings(),
	]);
	//const session = useAuth();
	return (
		<div className="grid grid-cols-2 border-primary-800 min-h-[400px]">
			<DateSelector
				bookedDates={bookedDates}
				settings={settings}
				cabin={cabin}
			/>
			{/* {session?.user ?  */}
			<ReservationForm cabin={cabin} />
			{/* //: <LoginMessage />} */}
		</div>
	);
}

export default Reservation;
