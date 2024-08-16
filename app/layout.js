import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
export const metadata = {
	title: {
		template: "%s - The Wild Oasis",
		default: "Welcome - The Wild Oasis",
	},
	description:
		"Luxorius Cabin hotel, located in the hearts of the Italian Alps. Surrounded by the Dolomites, mountain lakes and serenity of the Italian mountain life.",
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
