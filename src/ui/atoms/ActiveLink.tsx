"use client";

import { type UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { type Route } from "next/types";
import { usePathname } from "next/navigation";

type ActiveLinkProps<T extends string> = {
    href: Route<T>;
    children: React.ReactNode;
    className: string;
    activeClassName: string;
    exact?: boolean;
}
export function ActiveLink<T extends string>({
    href,
    children,
    className,
    activeClassName,
    exact = false
}: ActiveLinkProps<T>) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    const isAriaCurrent = isActive ? { "aria-current": true } : [""];

    const urlObject: UrlObject = typeof href === "string" ? { pathname: href } : href;
    return (
        <Link href={urlObject} className={clsx(className, { [activeClassName]: isActive })} {...isAriaCurrent}>
            {children}
        </Link>
    );
}
