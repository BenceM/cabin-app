"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const { data: session, status } = useSession();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === "loading") {
			setLoading(true);
		} else {
			setUser(session?.user || null);
			setLoading(false);
		}
	}, [session, status]);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("context was used outside provider");

	return context;
}
