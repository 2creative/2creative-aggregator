"use client";

import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Divider,
  Rating,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PreviewIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import DevicesIcon from "@mui/icons-material/Devices";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { Template } from "@/types/template";

const platformColors: Record<string, string> = {
  ThemeForest: "#82B541",
  Webflow: "#4353FF",
  Framer: "#0099FF",
};

interface TemplatePreviewModalProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  template,
  open,
  onClose,
}: TemplatePreviewModalProps) {
  if (!template) return null;

  const color = platformColors[template.platform] || "#6C63FF";
  const isFree =
    !template.price ||
    template.price === "Free" ||
    template.price === "$0";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#0F1420",
            backgroundImage: "none",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: alpha("#F1F5F9", 0.08),
          },
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        aria-label="Close preview"
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          zIndex: 10,
          bgcolor: alpha("#000", 0.6),
          backdropFilter: "blur(8px)",
          color: "#F1F5F9",
          "&:hover": { bgcolor: alpha("#000", 0.8) },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Large thumbnail */}
      {template.thumbnail && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxHeight: 400,
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background:
                "linear-gradient(transparent, #0F1420)",
            },
          }}
        >
          <Box
            component="img"
            src={template.thumbnail}
            alt={template.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 400,
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      )}

      <DialogContent sx={{ px: { xs: 2.5, md: 4 }, py: 3 }}>
        {/* Header: title + platform badge */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "flex-start" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.85rem" },
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {template.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              by{" "}
              <Box component="span" sx={{ color: color, fontWeight: 600 }}>
                {template.author}
              </Box>
            </Typography>
          </Box>

          {/* Price + platform */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Chip
              label={template.platform}
              size="small"
              sx={{
                bgcolor: alpha(color, 0.15),
                color,
                fontWeight: 700,
                border: "1px solid",
                borderColor: alpha(color, 0.3),
              }}
            />
            <Chip
              label={isFree ? "Free" : template.price}
              size="small"
              sx={{
                bgcolor: isFree
                  ? alpha("#4CAF50", 0.15)
                  : alpha("#FF9800", 0.15),
                color: isFree ? "#66BB6A" : "#FFB74D",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            />
          </Stack>
        </Stack>

        {/* Stats row */}
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{ mb: 2.5 }}
          flexWrap="wrap"
          useFlexGap
        >
          {/* Rating */}
          {template.rating > 0 && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Rating
                value={template.rating}
                precision={0.1}
                readOnly
                size="small"
                emptyIcon={
                  <StarIcon sx={{ opacity: 0.2, fontSize: "inherit" }} />
                }
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                {template.rating}
                {template.ratingCount
                  ? ` (${template.ratingCount.toLocaleString()})`
                  : ""}
              </Typography>
            </Stack>
          )}

          {/* Sales */}
          {template.sales > 0 && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TrendingUpIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                {template.sales.toLocaleString()} sales
              </Typography>
            </Stack>
          )}

          {/* Compatibility */}
          {template.compatibility && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <DevicesIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {template.compatibility}
              </Typography>
            </Stack>
          )}

          {/* Updated at */}
          {template.updatedAt && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <UpdateIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Updated{" "}
                {new Date(template.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ mb: 2, borderColor: alpha("#F1F5F9", 0.08) }} />

        {/* Description */}
        {template.description && (
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              mb: 2.5,
            }}
          >
            {template.description}
          </Typography>
        )}

        {/* Tags */}
        {template.tags.length > 0 && (
          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 3 }}
          >
            {template.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha("#F1F5F9", 0.06),
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  height: 26,
                }}
              />
            ))}
          </Stack>
        )}

        {/* Action buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          {template.previewUrl && (
            <Button
              variant="outlined"
              href={template.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<PreviewIcon />}
              endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderColor: alpha(color, 0.4),
                color,
                fontWeight: 700,
                px: 3,
                "&:hover": {
                  borderColor: color,
                  bgcolor: alpha(color, 0.08),
                },
              }}
            >
              Live Preview
            </Button>
          )}
          <Button
            variant="contained"
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={
              isFree ? (
                <OpenInNewIcon />
              ) : (
                <ShoppingCartIcon />
              )
            }
            sx={{
              bgcolor: color,
              fontWeight: 700,
              px: 3,
              "&:hover": {
                bgcolor: alpha(color, 0.85),
              },
            }}
          >
            {isFree ? "Get Template" : `Buy ${template.price}`}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
