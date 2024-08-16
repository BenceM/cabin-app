import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
export const metadata = {
	title: "The Wild Oasis",
	description: "Cabin renting webpage",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-primary-950 min-h-screen text-primary-100">
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
