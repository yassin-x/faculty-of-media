"use client";
import { Themes } from "@/constants/enums";
import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<string>(Themes.LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || Themes.LIGHT;
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return { theme, toggleTheme };
}
