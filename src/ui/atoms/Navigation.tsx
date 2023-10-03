import Image from "next/image";
import React from "react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export function Navigation() {
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
            <div className="flex items-center">
                <Image src="https://via.placeholder.com/150" alt="Logo" className="h-8 mr-2" width={150} height={150} />
                <p className="text-lg font-bold">My App</p>
            </div>
            <nav>
                <ul className="flex justify-center space-x-4">
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/"}
                            exact
                        >Home</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/products"}
                        >All</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/categories"}
                        >Categories</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/collections"}
                        >Collections</ActiveLink>
                    </li>
                </ul>
            </nav>
        </header >
    );
}
