"use client";
import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminNavbar() {
  const links = [
    {
      id: crypto.randomUUID(),
      name: "Hero",
      href: Pages.HERO,
    },
    {
      id: crypto.randomUUID(),
      name: "About",
      href: Pages.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      name: "Events",
      href: Pages.EVENTS,
    },
    {
      id: crypto.randomUUID(),
      name: "FAQ",
      href: Pages.FAQ,
    },
  ];
  const pathname = usePathname();

  return (
    <nav className="container flex justify-center items-center py-4">
      <ul className="flex justify-center items-center gap-4">
        {links.map((link) => {
          const isPathname = pathname.startsWith(
            `/${Routes.ADMIN}/${link.href}`
          );
          return (
            <li
              key={link.id}
              className="relative group font-semibold text-[16px]"
            >
              <Link
                href={`/${Routes.ADMIN}/${link.href}`}
                className={`${
                  isPathname ? "text-primary" : "hover:text-primary"
                }  transition-colors duration-300`}
              >
                {link.name}
              </Link>
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-primary w-[70%] transition-transform duration-300 origin-left rounded-e-full ${
                  isPathname
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
