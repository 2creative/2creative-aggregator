"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Fade,
  Grid,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import TemplateCard from "@/components/TemplateCard";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Template } from "@/types/template";
import templateData from "../../../public/data/templates.json";

// Platform config
const platforms = [
  { label: "All", value: "all", color: "#6C63FF" },
  { label: "ThemeForest", value: "ThemeForest", color: "#82B541" },
  { label: "Webflow", value: "Webflow", color: "#4353FF" },
  { label: "Framer", value: "Framer", color: "#0099FF" },
  { label: "TemplateMonster", value: "TemplateMonster", color: "#FF5722" },
];

type SortOption = "sales" | "price_asc" | "price_desc" | "rating" | "newest";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Most Popular", value: "sales" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [activePlatform, setActivePlatform] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const handleCardClick = useCallback((template: Template) => {
    setSelectedTemplate(template);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedTemplate(null);
  }, []);

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
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

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
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(108, 99, 255, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Chip
            icon={<ViewQuiltIcon sx={{ fontSize: 16 }} />}
            label="Web Templates"
            size="small"
            sx={{
              mb: 2,
              bgcolor: alpha("#6C63FF", isDark ? 0.15 : 0.08),
              color: isDark ? "#9D97FF" : "#6C63FF",
              fontWeight: 600,
              "& .MuiChip-icon": { color: isDark ? "#9D97FF" : "#6C63FF" },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              mb: 1,
              fontWeight: 800,
              background: isDark
                ? "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #F1F5F9 100%)"
                : "linear-gradient(135deg, #1E293B 0%, #475569 50%, #1E293B 100%)",
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
            {templates.length} top-selling templates from ThemeForest, Webflow,
            Framer &amp; TemplateMonster — updated daily.
          </Typography>
        </Container>
      </Box>

      {/* ─── Filters ─── */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 10,
          bgcolor: alpha(theme.palette.background.default, 0.85),
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
                        ? alpha(p.color, isDark ? 0.2 : 0.12)
                        : alpha(theme.palette.text.primary, 0.05),
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
                    bgcolor: alpha(theme.palette.text.primary, 0.03),
                    "& fieldset": {
                      borderColor: alpha(theme.palette.text.primary, 0.1),
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
                    bgcolor: alpha(theme.palette.text.primary, 0.03),
                    "& fieldset": {
                      borderColor: alpha(theme.palette.text.primary, 0.1),
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
      <Box sx={{ py: 4, flexGrow: 1 }}>
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
                      template={template}
                      onClick={handleCardClick}
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

      {/* ─── Preview Modal ─── */}
      <TemplatePreviewModal
        template={selectedTemplate}
        open={selectedTemplate !== null}
        onClose={handleModalClose}
      />

      <Footer />
    </Box>
  );
}
