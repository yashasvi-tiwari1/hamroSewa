import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-50 border h-max">
            <div className="container md:px-16 px-8 flex flex-wrap items-center justify-between mx-auto p-3  ">
                <Link href="/" className="flex items-center">
                    <Image
                        height={150}
                        width={150}
                        src="/assets/logo.svg"
                        className="mr-3 w-40 "
                        alt="hamro sewa logo"
                    />
                </Link>
                <div className="block sm:hidden">
                </div>
                <div className="flex md:hidden">
                    <button
                        name="menu"
                        data-collapse-toggle="navbar-search"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
                        {isMenuOpen? (
                            <IconX className="w-6 h-6" />
                        ) : (
                            <IconMenu2 className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <div
                    className={`items-center justify-between w-full md:flex md:w-auto ${
                        isMenuOpen ? "block" : "hidden"
                    }`}
                    id="navbar-search"
                >
                    <div className="flex text-black flex-col p-4 md:p-0 mt-4 font-medium  md:flex-row md:space-x-8 md:mt-0 md:border-0  content-center">
                        <NavbarLink name="Home" href="/" />
                        <NavbarLink name="Our Services" href="/services" />
                        <NavbarLink name="Contact" href="/contact" />
                        <NavbarLink name="About" href="/about"/>
                    </div>
                </div>
            </div>

        </nav>
    );
}

interface NavbarLinkProps {
    href: string;
    name: string;
}

function NavbarLink({ href, name }: NavbarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`${
                isActive?"text-custom-tale ":""
            }`}
        >
            {name}
        </Link>
    );
}

export default Navbar;