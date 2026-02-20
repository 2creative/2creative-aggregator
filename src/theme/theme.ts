"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6C63FF", // Electric indigo
      light: "#9D97FF",
      dark: "#4A42D4",
    },
    secondary: {
      main: "#00E5FF", // Cyan accent
      light: "#6EFFFF",
      dark: "#00B2CC",
    },
    background: {
      default: "#0A0E1A", // Deep navy
      paper: "#111827", // Slightly lighter navy
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    divider: "rgba(148, 163, 184, 0.12)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#1E293B #0A0E1A",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: "#0A0E1A",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#1E293B",
            borderRadius: 4,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(148, 163, 184, 0.08)",
          transition:
            "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            borderColor: "rgba(108, 99, 255, 0.3)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
          fontSize: "0.9375rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6C63FF 0%, #9D97FF 100%)",
          boxShadow: "0 4px 14px rgba(108, 99, 255, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg, #5A52E0 0%, #8B85FF 100%)",
            boxShadow: "0 6px 20px rgba(108, 99, 255, 0.6)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(10, 14, 26, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
        },
      },
    },
  },
});

export default theme;
