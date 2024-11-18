import FormButton from "@/app/_components/FormButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
	const { bookingId } = params;
	//could add a date selector that works has to only work into the future, but also has to kinda check if the cabin is available at that time or not

	const { numGuests, observations, cabinId } = await getBooking(bookingId);
	const { maxCapacity } = await getCabin(cabinId);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Edit Reservation #{bookingId}
			</h2>

			<form
				action={updateReservation}
				className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
			>
				<input name="bookingId" value={bookingId} type="hidden" />
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						defaultValue={numGuests}
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						placeholder={"Look to the east"}
						defaultValue={observations}
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<FormButton>Update Reservation</FormButton>
				</div>
			</form>
		</div>
	);
}
