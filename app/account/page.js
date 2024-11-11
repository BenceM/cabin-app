import { Suspense } from "react";
import LoginNameDisplay from "../_components/LoginNameDisplay";
import Spinner from "../_components/Spinner";

export const metadata = {
	title: "Profile",
};

export default function Page() {
	// const { user } = useAuth();
	return (
		// <Suspense fallback={<Spinner />}>
		<LoginNameDisplay />
		// </Suspense>
	);
}
