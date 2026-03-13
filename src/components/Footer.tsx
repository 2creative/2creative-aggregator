"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Link as MuiLink,
  Divider,
  alpha,
} from "@mui/material";
import Link from "next/link";

const categoryLinks = [
  { label: "Templates", href: "/templates" },
  { label: "UI Kits", href: "/ui-kits" },
  { label: "3D Models", href: "/3d-models" },
  { label: "Presets & LUTs", href: "/presets" },
  { label: "Code & Plugins", href: "/plugins" },
  { label: "Fonts", href: "/fonts" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        pt: 6,
        pb: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={4}
          sx={{ mb: 4 }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 320 }}>
            <Box
              component="img"
              src="/images/2creative-logo.jpg"
              alt="2Creative.net"
              sx={{ height: 32, borderRadius: 1, mb: 1.5 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
              Premium creative resources curated from the world&apos;s top
              marketplaces — all in one place.
            </Typography>
          </Box>

          {/* Category links */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                mb: 1.5,
                display: "block",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Categories
            </Typography>
            <Stack
              direction={{ xs: "row", md: "column" }}
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              justifyContent="center"
            >
              {categoryLinks.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                    "&:hover": { color: "#6C63FF" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: alpha("#F1F5F9", 0.06) }} />

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}
        >
          © {new Date().getFullYear()} 2Creative.net — Built with Next.js &amp; MUI
        </Typography>
      </Container>
    </Box>
  );
}
