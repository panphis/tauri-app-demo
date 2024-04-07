import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	TooltipProvider,
} from "@/components/ui"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Device Dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<TooltipProvider>
				<body className={inter.className}>{children}</body>
			</TooltipProvider>
		</html>
	);
}
