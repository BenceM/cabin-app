import LoginNameDisplay from "../_components/LoginNameDisplay";
import { auth } from "../_lib/auth";

export const metadata = {
	title: "Profile",
};

export default async function Page() {
	const session = await auth();
	console.log(session);
	return (
		// <Suspense fallback={<Spinner />}>
		<LoginNameDisplay />
		// </Suspense>
	);
}
