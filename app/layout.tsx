/** @format */

import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Nunito } from "next/font/google";
// import Modal from "./components/modal/Modal";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/modal/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";
export const metadata = {
	title: "AptConnectSL",
	description: "Apartment Connect In Sierra Leone",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<RentModal />
					<SearchModal />
					<RegisterModel />
					<LoginModal />

					{/* <Modal isOpen /> */}

					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
