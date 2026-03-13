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
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import TuneIcon from "@mui/icons-material/Tune";
import CodeIcon from "@mui/icons-material/Code";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import UpdateIcon from "@mui/icons-material/Update";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HubIcon from "@mui/icons-material/Hub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Category data ─── */
const categories = [
  {
    title: "Web Templates",
    description:
      "Top-selling themes & templates from leading marketplaces — WordPress, Webflow, Framer & more.",
    icon: <ViewQuiltIcon sx={{ fontSize: 32 }} />,
    color: "#6C63FF",
    sources: "ThemeForest · Webflow · Framer · TemplateMonster",
    href: "/templates",
    live: true,
  },
  {
    title: "Premium UI Kits",
    description:
      "Beautiful app UI kits, dashboard designs, Figma systems & wireframe bundles for rapid prototyping.",
    icon: <DashboardCustomizeIcon sx={{ fontSize: 32 }} />,
    color: "#00B2CC",
    sources: "UI8 · Creative Market",
    href: "/ui-kits",
    live: false,
  },
  {
    title: "3D Models & Assets",
    description:
      "Professional 3D models, architectural visuals, game assets & environmental textures.",
    icon: <ViewInArIcon sx={{ fontSize: 32 }} />,
    color: "#F59E0B",
    sources: "TurboSquid · CGTrader · Unity · Unreal",
    href: "/3d-models",
    live: false,
  },
  {
    title: "Presets & LUTs",
    description:
      "Cinematic colour grading tools — Lightroom presets, video LUTs & After Effects packs.",
    icon: <TuneIcon sx={{ fontSize: 32 }} />,
    color: "#EF4444",
    sources: "FilterGrade · Envato Elements · Artlist",
    href: "/presets",
    live: false,
  },
  {
    title: "Code & Plugins",
    description:
      "React components, Python scripts, Shopify apps, WordPress plugins & automation tools.",
    icon: <CodeIcon sx={{ fontSize: 32 }} />,
    color: "#22C55E",
    sources: "CodeCanyon · Elementor · WP Rocket",
    href: "/plugins",
    live: false,
  },
  {
    title: "Creative Fonts",
    description:
      "Trending font families, brutalist typefaces & elegant serifs with commercial licences.",
    icon: <TextFieldsIcon sx={{ fontSize: 32 }} />,
    color: "#A855F7",
    sources: "MyFonts · Fontspring · Creative Market",
    href: "/fonts",
    live: false,
  },
];

/* ─── Value props ─── */
const valueProps = [
  {
    icon: <UpdateIcon sx={{ fontSize: 28 }} />,
    title: "Updated Daily",
    description: "Fresh resources curated every day from top marketplaces worldwide.",
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 28 }} />,
    title: "Top Platforms",
    description: "We aggregate from the most trusted creative marketplaces.",
  },
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 28 }} />,
    title: "Quality First",
    description: "Only top-rated, best-selling resources make it to our platform.",
  },
  {
    icon: <HubIcon sx={{ fontSize: 28 }} />,
    title: "One Place",
    description: "Stop jumping between sites — find everything you need right here.",
  },
];

export default function Home() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* ─── Hero Section ─── */}
      <Box
        component="section"
        sx={{
          pt: { xs: 16, md: 22 },
          pb: { xs: 10, md: 16 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <Box
          sx={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140%",
            height: "100%",
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.08) 0%, rgba(157, 151, 255, 0.04) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Hero image overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "-10%",
            width: "60%",
            height: "100%",
            backgroundImage: "url(/images/hero-platform.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isDark ? 0.08 : 0.12,
            pointerEvents: "none",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            icon={<RocketLaunchIcon sx={{ fontSize: 16 }} />}
            label="Your Complete Creative Platform"
            sx={{
              mb: 3,
              bgcolor: alpha("#6C63FF", isDark ? 0.1 : 0.08),
              color: isDark ? "#9D97FF" : "#6C63FF",
              fontWeight: 600,
              border: "1px solid",
              borderColor: alpha("#6C63FF", 0.2),
              "& .MuiChip-icon": { color: isDark ? "#9D97FF" : "#6C63FF" },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              background: isDark
                ? "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #F1F5F9 100%)"
                : "linear-gradient(135deg, #1E293B 0%, #475569 50%, #1E293B 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
            }}
          >
            Everything You Need
            <br />
            to Create, All in One Place
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: "text.secondary",
              maxWidth: 580,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.8,
            }}
          >
            Templates, UI kits, 3D models, presets, code, and fonts — curated
            from the world&apos;s top creative marketplaces. Find the perfect resource
            for your next project.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/templates"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 5, py: 1.5 }}
            >
              Explore Templates
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#categories"
              sx={{
                px: 5,
                py: 1.5,
                borderColor: alpha(theme.palette.text.primary, 0.15),
                color: "text.secondary",
                "&:hover": {
                  borderColor: alpha("#6C63FF", 0.5),
                  bgcolor: alpha("#6C63FF", 0.05),
                },
              }}
            >
              Browse Categories
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ─── Categories Section ─── */}
      <Box component="section" id="categories" sx={{ pb: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Creative Resources for Every Need
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "text.secondary",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            From web templates to 3D assets — we bring together the best resources
            from top marketplaces so you don&apos;t have to search everywhere.
          </Typography>

          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.title}>
                <Card
                  component={Link}
                  href={cat.href}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 0.5,
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover .cat-icon-box": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ mb: 2.5 }}
                    >
                      <Box
                        className="cat-icon-box"
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          bgcolor: alpha(cat.color, isDark ? 0.12 : 0.08),
                          color: cat.color,
                          display: "flex",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        {cat.icon}
                      </Box>
                      {cat.live ? (
                        <Chip
                          label="Live"
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            bgcolor: alpha("#22C55E", isDark ? 0.15 : 0.1),
                            color: "#22C55E",
                            fontWeight: 700,
                          }}
                        />
                      ) : (
                        <Chip
                          label="Coming Soon"
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            bgcolor: alpha("#6C63FF", isDark ? 0.15 : 0.08),
                            color: isDark ? "#9D97FF" : "#6C63FF",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Stack>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                      {cat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
                    >
                      {cat.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                        fontWeight: 500,
                        fontSize: "0.7rem",
                      }}
                    >
                      {cat.sources}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Why 2Creative Section ─── */}
      <Box
        component="section"
        sx={{
          py: 10,
          bgcolor: isDark
            ? alpha("#111827", 0.5)
            : alpha("#F1F5F9", 0.5),
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Why 2Creative?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "text.secondary",
              maxWidth: 480,
              mx: "auto",
            }}
          >
            We do the hard work of finding and curating — so you can focus
            on what you do best: creating.
          </Typography>

          <Grid container spacing={3}>
            {valueProps.map((vp) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={vp.title}>
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: alpha("#6C63FF", isDark ? 0.12 : 0.08),
                      color: "#6C63FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {vp.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                    {vp.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {vp.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── CTA Section ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
          >
            Ready to Find Your Next Resource?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 4, lineHeight: 1.7 }}
          >
            Start browsing our curated collection of templates from ThemeForest,
            Webflow, Framer &amp; TemplateMonster.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/templates"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 5, py: 1.5 }}
          >
            Browse Templates
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
