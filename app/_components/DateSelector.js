"use client";
import { isWithinInterval } from "date-fns";
import { Chevron, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import "react-day-picker/dist/style.css";
import classNames from "react-day-picker/style.module.css";
function isAlreadyBooked(range, datesArr) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to }),
		)
	);
}

function DateSelector() {
	const defaultClassNames = getDefaultClassNames();
	console.log(classNames);
	// CHANGE
	const regularPrice = 23;
	const discount = 23;
	const numNights = 23;
	const cabinPrice = 23;
	const range = { from: null, to: null };

	// SETTINGS
	const minBookingLength = 1;
	const maxBookingLength = 23;
	console.log(new Date().getFullYear() + 5);
	const dateInFuture = new Date().setFullYear(new Date().getFullYear() + 5);

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className={`py-12 px-3 place-self-center`}
				mode="range"
				min={minBookingLength + 1}
				max={maxBookingLength}
				startMonth={new Date(new Date().getFullYear(), 0, 1)}
				// hidden={[{ before: new Date(2010, 11, 3) }]}
				endMonth={dateInFuture}
				captionLayout="dropdown"
				numberOfMonths={2}
			/>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px] mx-10">
				<div className="flex items-baseline gap-6">
					<p className="flex gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${regularPrice - discount}</span>
								<span className="line-through font-semibold text-primary-700">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl">${regularPrice}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{" "}
								<span className="text-2xl font-semibold">${cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{range.from || range.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={() => resetRange()}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
