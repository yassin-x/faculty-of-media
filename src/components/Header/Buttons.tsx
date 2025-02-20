"use client";
import { Themes } from "@/constants/enums";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
export default function Buttons({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const { theme, toggleTheme } = useTheme();
  const session = useClientSession(initialSession);
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="p-4 rounded-full"
      >
        {theme === Themes.DARK ? <SunIcon /> : <MoonIcon />}
      </Button>
      {session.data?.user && (
        <Button
          onClick={() => signOut()}
          aria-label="Toggle Theme"
          className="p-4 rounded-full"
        >
          <LogOut />
        </Button>
      )}
    </div>
  );
}
