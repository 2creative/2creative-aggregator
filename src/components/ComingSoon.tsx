"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ComingSoonProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  sources: string[];
}

export default function ComingSoon({
  title,
  icon,
  color,
  description,
  sources,
}: ComingSoonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          py: { xs: 16, md: 20 },
        }}
      >
        {/* Background glow */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            background: `radial-gradient(ellipse at center, ${alpha(color, 0.08)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 4,
              bgcolor: alpha(color, isDark ? 0.12 : 0.08),
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              fontSize: 40,
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            {title}
          </Typography>

          <Chip
            label="Coming Soon"
            sx={{
              mb: 3,
              bgcolor: alpha(color, isDark ? 0.15 : 0.1),
              color: color,
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              lineHeight: 1.8,
            }}
          >
            {description}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              mb: 4,
              fontWeight: 500,
            }}
          >
            Curating from:{" "}
            <Stack
              component="span"
              direction="row"
              spacing={0.75}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: 1 }}
            >
              {sources.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7rem",
                    height: 24,
                    borderColor: alpha(theme.palette.text.primary, 0.1),
                    color: "text.secondary",
                  }}
                />
              ))}
            </Stack>
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/templates"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Templates
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
