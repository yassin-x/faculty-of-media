"use client";

import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

export default function Navbar({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const links = [
    {
      id: crypto.randomUUID(),
      name: "Events",
      href: Pages.EVENTS,
    },
    {
      id: crypto.randomUUID(),
      name: "Books",
      href: Pages.BOOKS,
    },
    {
      id: crypto.randomUUID(),
      name: "Staff",
      href: Pages.STAFF,
    },
  ];
  const pathname = usePathname();
  const session = useClientSession(initialSession);
  const isSessionPathname = pathname.startsWith(`/${Routes.ADMIN}`);
  return (
    <nav>
      <ul className="flex justify-center items-center gap-4">
        <li className="hidden md:block">
          <Link href="/">
            <Image
              src={"/bsu-logo.png"}
              alt="bsu-logo"
              width={50}
              height={50}
              className="object-cover rounded-full"
            />
          </Link>
        </li>
        {links.map((link) => {
          const isPathname = pathname.startsWith(`/${link.href}`);
          return (
            <li
              key={link.id}
              className="relative group font-semibold text-[16px]"
            >
              <Link
                href={`/${link.href}`}
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
        {session.data?.user && (
          <li className="relative group font-semibold text-[16px]">
            <Link
              href={`/${Routes.ADMIN}`}
              className={`${
                isSessionPathname ? "text-primary" : "hover:text-primary"
              }  transition-colors duration-300`}
            >
              Admin
            </Link>
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-primary w-[70%] transition-transform duration-300 origin-left rounded-e-full ${
                isSessionPathname
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></span>
          </li>
        )}
      </ul>
    </nav>
  );
}
