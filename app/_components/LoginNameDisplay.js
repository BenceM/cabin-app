"use client";

import { useAuth } from "./AuthContext";
import Spinner from "./Spinner";

export default function LoginNameDisplay() {
	const { user, loading } = useAuth();
	const firstName = user?.name.split(" ").at(0);

	return (
		<h2 className="font-semibold text-2xl text-accent-400 mb-7">
			{loading ? <Spinner /> : `Welcome ${firstName}`}
		</h2>
	);
}
