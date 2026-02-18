"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  AppBar,
  Toolbar,
  Stack,
  alpha,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SchoolIcon from "@mui/icons-material/School";
import BrushIcon from "@mui/icons-material/Brush";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PaletteIcon from "@mui/icons-material/Palette";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Link from "next/link";

const modules = [
  {
    title: "Creative Job Board",
    description: "Remote jobs from WeWorkRemotely, RemoteOK & HN Hiring — filtered for creatives.",
    icon: <WorkOutlineIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 1",
    phaseColor: "#22C55E",
    tags: ["Design", "Frontend", "Web3"],
  },
  {
    title: "Template Market",
    description: "Top-selling themes & templates from ThemeForest, Webflow, Framer & Notion.",
    icon: <ViewQuiltIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 1",
    phaseColor: "#22C55E",
    tags: ["WordPress", "Webflow", "Framer"],
    href: "/templates",
  },
  {
    title: "AI & SaaS Tool Hunter",
    description: "Hottest AI tools from Product Hunt & FutureTools — updated daily.",
    icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 1",
    phaseColor: "#22C55E",
    tags: ["AI", "SaaS", "Productivity"],
  },
  {
    title: "Deal Drop",
    description: "Price drops on cameras, drones, GPUs & lifetime software deals.",
    icon: <LocalOfferIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 2",
    phaseColor: "#F59E0B",
    tags: ["Amazon", "AppSumo", "Tech"],
  },
  {
    title: "Learning & Courses",
    description: "Discounted courses in Python, React, Photography & more.",
    icon: <SchoolIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 2",
    phaseColor: "#F59E0B",
    tags: ["Udemy", "Coursera", "Skills"],
  },
  {
    title: "Creative Assets",
    description: "Free photos, trending fonts, 3D assets — curated daily.",
    icon: <BrushIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 2",
    phaseColor: "#F59E0B",
    tags: ["Unsplash", "Fonts", "3D"],
  },
  {
    title: "Crypto & Market Watch",
    description: "Track Metaverse, Render & AI tokens plus NFT floor movers.",
    icon: <ShowChartIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 3",
    phaseColor: "#6C63FF",
    tags: ["CoinGecko", "NFTs", "DeFi"],
  },
  {
    title: "Inspiration Feed",
    description: "Popular shots from Dribbble, Behance & Awwwards — Site of the Day.",
    icon: <PaletteIcon sx={{ fontSize: 32 }} />,
    phase: "Phase 3",
    phaseColor: "#6C63FF",
    tags: ["UI/UX", "Design", "Awards"],
  },
];

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* ─── Navigation ─── */}
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #6C63FF, #00E5FF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.25rem",
            }}
          >
            2Creative.net
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              component={Link}
              href="/templates"
              size="small"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                "&:hover": { color: "#6C63FF" },
              }}
            >
              Templates
            </Button>
            <Chip
              label="Coming Soon"
              size="small"
              sx={{
                bgcolor: alpha("#6C63FF", 0.15),
                color: "#9D97FF",
                fontWeight: 600,
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ─── Hero Section ─── */}
      <Box
        component="section"
        sx={{
          pt: { xs: 16, md: 20 },
          pb: { xs: 10, md: 14 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Chip
            icon={<RocketLaunchIcon sx={{ fontSize: 16 }} />}
            label="The Creative Command Center"
            sx={{
              mb: 3,
              bgcolor: alpha("#6C63FF", 0.1),
              color: "#9D97FF",
              fontWeight: 600,
              border: "1px solid",
              borderColor: alpha("#6C63FF", 0.2),
              "& .MuiChip-icon": { color: "#9D97FF" },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              background:
                "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #F1F5F9 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
            }}
          >
            The Ultimate Creative
            <br />
            Aggregator
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: "text.secondary",
              maxWidth: 560,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.8,
            }}
          >
            Jobs, templates, AI tools, deals, courses, and inspiration — all
            aggregated into one powerful dashboard. Updated daily. Built for
            creators.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{ px: 5, py: 1.5 }}
            >
              Explore Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderColor: alpha("#F1F5F9", 0.15),
                color: "text.secondary",
                "&:hover": {
                  borderColor: alpha("#6C63FF", 0.5),
                  bgcolor: alpha("#6C63FF", 0.05),
                },
              }}
            >
              View Roadmap
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ─── Module Cards ─── */}
      <Box component="section" sx={{ pb: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            8 Modules. One Dashboard.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "text.secondary",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Each module is a separate scraper, a separate data feed, and a
            separate revenue stream.
          </Typography>

          <Grid container spacing={3}>
            {modules.map((mod) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={mod.title}>
                <Card
                  component={mod.href ? Link : "div"}
                  href={mod.href}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 0.5,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ mb: 2 }}
                    >
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 2,
                          bgcolor: alpha(mod.phaseColor, 0.1),
                          color: mod.phaseColor,
                          display: "flex",
                        }}
                      >
                        {mod.icon}
                      </Box>
                      <Chip
                        label={mod.phase}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 22,
                          bgcolor: alpha(mod.phaseColor, 0.1),
                          color: mod.phaseColor,
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {mod.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                    >
                      {mod.description}
                    </Typography>
                    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                      {mod.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                            height: 24,
                            borderColor: alpha("#F1F5F9", 0.1),
                            color: "text.secondary",
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Footer ─── */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          © {new Date().getFullYear()} 2Creative.net — Built with Next.js &amp; MUI
        </Typography>
      </Box>
    </Box>
  );
}
