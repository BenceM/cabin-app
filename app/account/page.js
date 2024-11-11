import { useAuth } from "../_components/AuthContext";

export const metadata = {
	title: "Profile",
};

export default function Page() {
	// const { user } = useAuth();
	return (
		<h2 className="font-semibold text-2xl text-accent-400 mb-7">Welcome</h2>
	);
}
