"use client";
import Link from "next/link";

import { useAuth } from "./AuthContext";

function Guest() {
	const session = useAuth();
	return (
		<li>
			{session?.user?.image ? (
				<Link
					href="/account"
					className="hover:text-accent-400 transition-colors flex items-center gap-4"
				>
					<img
						src={session.user.image}
						alt="user image"
						className="h-8 rounded-full"
						referrerPolicy="no-referrer"
					/>
					<span>Account</span>
				</Link>
			) : (
				<Link
					href="/account"
					className="hover:text-accent-400 transition-colors"
				>
					Account
				</Link>
			)}
		</li>
	);
}
export default Guest;
