import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Wagonopedia",
};

function NavButton1({label, href}: { label: string; href: string }) {
    return (
        <a href={href}>
            <button className="w-40 h-11 bg-neutral-800 mt-1 mb-1 mr-auto ml-1 rounded-md border-2">
                <p className="text-red-600 font-bold">{label}</p>
            </button>
        </a>
    )
}

function NavLogo() {
    return (
        <img src="favicon.ico" alt="logo" className="h-11 w-11"></img>
    )
}

function NavBar({className}: { className: string }) {
    return (
        <nav className={className}>
            <NavLogo/>
            <div>
                <NavButton1 label="Home" href="/"/>
                <NavButton1 label="Discover" href="/discover"/>
                <NavButton1 label="What's new" href="/whatsnew"/>
            </div>
        </nav>
    )
}



function Footer({className}: { className: string }) {
    return (
        <footer className={className}>
            <p className="text-center align-text-bottom text-red-600 mt-19">wagntzm</p>
        </footer>
    )
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
        <NavBar className="w-full h-13 bg-neutral-900 flex flex-row items-center"/>
        <main>{children}</main>
        <Footer className="w-full h-26 bg-neutral-900 mt-auto"/>
        </body>
        </html>
    )
}
