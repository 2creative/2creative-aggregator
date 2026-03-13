"use client";

import { useState, useMemo, useCallback, useSyncExternalStore, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./ThemeContext";

type ThemeMode = "light" | "dark";

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("2c-theme-mode");
  return stored === "dark" ? "dark" : "light";
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const storedMode = useSyncExternalStore(subscribe, getStoredMode, () => "light" as ThemeMode);
  const [localMode, setLocalMode] = useState<ThemeMode | null>(null);

  const mode = localMode ?? storedMode;

  const toggleTheme = useCallback(() => {
    setLocalMode((prev) => {
      const current = prev ?? storedMode;
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("2c-theme-mode", next);
      return next;
    });
  }, [storedMode]);

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
