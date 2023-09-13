"use client";

import { type UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type Route } from "next/types";

export function ActiveLink<T extends string>({
    href,
    children,
    className,
    activeClassName,
    exact = false
}: {
    href: Route<T>;
    children: React.ReactNode;
    className: string;
    activeClassName: string;
    exact?: boolean;
}) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    const urlObject: UrlObject = typeof href === "string" ? { pathname: href } : href;
    return (
        <Link href={urlObject} className={clsx(className, { [activeClassName]: isActive })}>
            {children}
        </Link>
    );
}
