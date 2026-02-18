"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  AppBar,
  Toolbar,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  Fade,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import templateData from "../../../public/data/templates.json";

// Platform config
const platforms = [
  { label: "All", value: "all", color: "#6C63FF" },
  { label: "ThemeForest", value: "ThemeForest", color: "#82B541" },
  { label: "Webflow", value: "Webflow", color: "#4353FF" },
  { label: "Framer", value: "Framer", color: "#0099FF" },
];

type SortOption = "sales" | "price_asc" | "price_desc" | "rating" | "newest";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Most Popular", value: "sales" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

interface Template {
  id: string;
  title: string;
  author: string;
  platform: string;
  category: string;
  price: string;
  rating: number;
  sales: number;
  tags: string[];
  thumbnail: string;
  url: string;
  description: string;
  scrapedAt?: string;
}

function parsePrice(price: string): number {
  const match = price.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function sortTemplates(templates: Template[], sortBy: SortOption): Template[] {
  const sorted = [...templates];
  switch (sortBy) {
    case "sales":
      return sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));
    case "price_asc":
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price_desc":
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.scrapedAt || 0).getTime() -
          new Date(a.scrapedAt || 0).getTime()
      );
    default:
      return sorted;
  }
}

export default function TemplatesPage() {
  const [activePlatform, setActivePlatform] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("sales");
  const [searchQuery, setSearchQuery] = useState("");

  const templates: Template[] = templateData.templates as Template[];

  // Stats
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    templates.forEach((t) => {
      counts[t.platform] = (counts[t.platform] || 0) + 1;
    });
    return counts;
  }, [templates]);

  // Filter + Sort
  const filteredTemplates = useMemo(() => {
    let results = templates;

    // Platform filter
    if (activePlatform !== "all") {
      results = results.filter((t) => t.platform === activePlatform);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.author.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return sortTemplates(results, sortBy);
  }, [templates, activePlatform, sortBy, searchQuery]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* ─── Navigation ─── */}
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              component={Link}
              href="/"
              sx={{ color: "text.secondary" }}
              aria-label="Back to home"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/images/2creative-logo.jpg"
                alt="2Creative.net"
                sx={{
                  height: 36,
                  width: "auto",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Stack>
          <Chip
            icon={<ViewQuiltIcon sx={{ fontSize: 16 }} />}
            label="Template Market"
            size="small"
            sx={{
              bgcolor: alpha("#6C63FF", 0.15),
              color: "#9D97FF",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "#9D97FF" },
            }}
          />
        </Toolbar>
      </AppBar>

      {/* ─── Hero / Header ─── */}
      <Box
        sx={{
          pt: { xs: 14, md: 16 },
          pb: { xs: 3, md: 4 },
          textAlign: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              mb: 1,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #F1F5F9 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Template Marketplace
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 500,
              mx: "auto",
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            {templates.length} top-selling templates from ThemeForest, Webflow &
            Framer — updated daily.
          </Typography>
        </Container>
      </Box>

      {/* ─── Filters ─── */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 10,
          bgcolor: alpha("#0B0F1A", 0.85),
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ md: "center" }}
            justifyContent="space-between"
          >
            {/* Platform chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {platforms.map((p) => (
                <Chip
                  key={p.value}
                  label={`${p.label} ${platformCounts[p.value] || 0}`}
                  size="small"
                  onClick={() => setActivePlatform(p.value)}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    height: 32,
                    bgcolor:
                      activePlatform === p.value
                        ? alpha(p.color, 0.2)
                        : alpha("#F1F5F9", 0.05),
                    color:
                      activePlatform === p.value ? p.color : "text.secondary",
                    border: "1px solid",
                    borderColor:
                      activePlatform === p.value
                        ? alpha(p.color, 0.3)
                        : "transparent",
                    "&:hover": {
                      bgcolor: alpha(p.color, 0.15),
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Stack>

            {/* Search + Sort */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                size="small"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  minWidth: 200,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: alpha("#F1F5F9", 0.05),
                    "& fieldset": {
                      borderColor: alpha("#F1F5F9", 0.1),
                    },
                  },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="sort-label">
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <SortIcon sx={{ fontSize: 16 }} />
                    <span>Sort</span>
                  </Stack>
                </InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortBy}
                  label="Sort"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  sx={{
                    bgcolor: alpha("#F1F5F9", 0.05),
                    "& fieldset": {
                      borderColor: alpha("#F1F5F9", 0.1),
                    },
                  }}
                >
                  {sortOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ─── Template Grid ─── */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {filteredTemplates.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h5" sx={{ mb: 1, color: "text.secondary" }}>
                No templates found
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Try adjusting your filters or search query.
              </Typography>
            </Box>
          ) : (
            <Fade in>
              <Grid container spacing={2.5}>
                {filteredTemplates.map((template, index) => (
                  <Grid
                    key={template.id || index}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <TemplateCard
                      title={template.title}
                      author={template.author}
                      platform={template.platform}
                      category={template.category}
                      price={template.price}
                      rating={template.rating}
                      sales={template.sales}
                      tags={template.tags}
                      thumbnail={template.thumbnail}
                      url={template.url}
                      description={template.description}
                    />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}

          {/* Stats footer */}
          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Showing {filteredTemplates.length} of {templates.length} templates
              • Last updated:{" "}
              {new Date(templateData.lastUpdated).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>
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
          © {new Date().getFullYear()} 2Creative.net — Built with Next.js & MUI
        </Typography>
      </Box>
    </Box>
  );
}
