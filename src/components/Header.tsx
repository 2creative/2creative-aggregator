"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  alpha,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import TuneIcon from "@mui/icons-material/Tune";
import CodeIcon from "@mui/icons-material/Code";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Link from "next/link";
import { useThemeMode } from "@/theme/ThemeContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  live: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Templates",
    href: "/templates",
    icon: <ViewQuiltIcon sx={{ fontSize: 20 }} />,
    live: true,
  },
  {
    label: "UI Kits",
    href: "/ui-kits",
    icon: <DashboardCustomizeIcon sx={{ fontSize: 20 }} />,
    live: false,
  },
  {
    label: "3D Models",
    href: "/3d-models",
    icon: <ViewInArIcon sx={{ fontSize: 20 }} />,
    live: false,
  },
  {
    label: "Presets & LUTs",
    href: "/presets",
    icon: <TuneIcon sx={{ fontSize: 20 }} />,
    live: false,
  },
  {
    label: "Code & Plugins",
    href: "/plugins",
    icon: <CodeIcon sx={{ fontSize: 20 }} />,
    live: false,
  },
  {
    label: "Fonts",
    href: "/fonts",
    icon: <TextFieldsIcon sx={{ fontSize: 20 }} />,
    live: false,
  },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, toggleTheme } = useThemeMode();

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <Box
              component="img"
              src="/images/2creative-logo.jpg"
              alt="2Creative.net"
              sx={{ height: 36, width: "auto", borderRadius: 1 }}
            />
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  size="small"
                  startIcon={item.icon}
                  sx={{
                    color: item.live ? "text.primary" : "text.secondary",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    px: 1.5,
                    "&:hover": { color: "#6C63FF" },
                  }}
                >
                  {item.label}
                  {!item.live && (
                    <Chip
                      label="Soon"
                      size="small"
                      sx={{
                        ml: 0.75,
                        height: 18,
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        bgcolor: alpha("#6C63FF", 0.15),
                        color: "#9D97FF",
                      }}
                    />
                  )}
                </Button>
              ))}

              {/* Theme toggle */}
              <IconButton
                onClick={toggleTheme}
                size="small"
                aria-label="Toggle theme"
                sx={{
                  ml: 1,
                  color: "text.secondary",
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  "&:hover": {
                    bgcolor: alpha("#6C63FF", 0.1),
                    color: "#6C63FF",
                  },
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Stack>
          )}

          {/* Mobile: theme toggle + hamburger */}
          {isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton
                onClick={toggleTheme}
                size="small"
                aria-label="Toggle theme"
                sx={{ color: "text.secondary" }}
              >
                {mode === "light" ? (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: "text.primary" }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box
            component="img"
            src="/images/2creative-logo.jpg"
            alt="2Creative.net"
            sx={{ height: 28, borderRadius: 1 }}
          />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.5,
                  "&:hover": { bgcolor: alpha("#6C63FF", 0.08) },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: item.live ? "#6C63FF" : "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: item.live ? "text.primary" : "text.secondary",
                  }}
                />
                {!item.live && (
                  <Chip
                    label="Soon"
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      bgcolor: alpha("#6C63FF", 0.15),
                      color: "#9D97FF",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
