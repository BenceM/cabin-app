import LoginNameDisplay from "../_components/LoginNameDisplay";
import { auth } from "../_lib/auth";

export const metadata = {
	title: "Profile",
};

export default async function Page() {
	return (
		// <Suspense fallback={<Spinner />}>
		<LoginNameDisplay />
		// </Suspense>
	);
}
