"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Rating,
  alpha,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";

// Platform color map
const platformColors: Record<string, string> = {
  ThemeForest: "#82B541",
  Webflow: "#4353FF",
  Framer: "#0099FF",
};

interface TemplateCardProps {
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
}

export default function TemplateCard({
  title,
  author,
  platform,
  price,
  rating,
  sales,
  tags,
  thumbnail,
  url,
}: TemplateCardProps) {
  const platformColor = platformColors[platform] || "#6C63FF";

  return (
    <Card
      component="a"
      href={url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      sx={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 12px 40px ${alpha(platformColor, 0.25)}`,
          "& .template-thumbnail": {
            transform: "scale(1.05)",
          },
          "& .template-overlay": {
            opacity: 1,
          },
        },
      }}
    >
      {/* Thumbnail with overlay */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={thumbnail || ""}
          alt={title}
          className="template-thumbnail"
          sx={{
            height: 200,
            objectFit: "cover",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            bgcolor: alpha(platformColor, 0.05),
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.currentTarget;
            img.style.display = "none";
          }}
        />

        {/* Price badge */}
        <Chip
          label={price || "Free"}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            color: price === "Free" || price === "$0" ? "#22C55E" : "#fff",
            fontWeight: 700,
            fontSize: "0.8rem",
            height: 28,
          }}
        />

        {/* Platform badge */}
        <Chip
          label={platform}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: alpha(platformColor, 0.85),
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.7rem",
            height: 24,
          }}
        />

        {/* Hover overlay */}
        <Box
          className="template-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: alpha(platformColor, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <Chip
            icon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
            label="View Template"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 1 }}
        >
          by {author}
        </Typography>

        {/* Rating + Sales row */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          {rating > 0 && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Rating
                value={rating}
                readOnly
                precision={0.1}
                size="small"
                emptyIcon={<StarIcon sx={{ fontSize: 16, opacity: 0.2 }} />}
                sx={{
                  "& .MuiRating-iconFilled": { color: "#F59E0B" },
                  fontSize: 16,
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {rating.toFixed(1)}
              </Typography>
            </Stack>
          )}
          {sales > 0 && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {sales >= 1000
                ? `${(sales / 1000).toFixed(1)}k sales`
                : `${sales} sales`}
            </Typography>
          )}
        </Stack>

        {/* Tags */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.65rem",
                height: 22,
                borderColor: alpha("#F1F5F9", 0.1),
                color: "text.secondary",
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
