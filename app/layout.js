import Logo from "./components/Logo";
import Navigation from "./components/navigation";

export const metadata = {
	title: "The Wild Oasis",
	description: "Cabin renting webpage",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
