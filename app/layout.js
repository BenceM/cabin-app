import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import { Josefin_Sans, Montserrat_Alternates } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});
const montserrat = Montserrat_Alternates({
	subsets: ["latin"],
	display: "swap",
	weight: ["300", "600"],
});
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
			<body
				className={`${josefin.className}  bg-primary-950 min-h-screen text-primary-100 flex flex-col antialiased `}
			>
				<Header />
				<div className="flex-1 px-8 py-12 grid">
					<main className="mx-auto  max-w-7xl w-full">{children}</main>
				</div>
			</body>
		</html>
	);
}
