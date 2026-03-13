import TuneIcon from "@mui/icons-material/Tune";
import ComingSoon from "@/components/ComingSoon";

export default function PresetsPage() {
  return (
    <ComingSoon
      title="Presets & LUTs"
      icon={<TuneIcon sx={{ fontSize: 40 }} />}
      color="#EF4444"
      description="Cinematic colour grading tools — Lightroom presets, Premiere Pro & DaVinci Resolve LUTs, and After Effects transition packs."
      sources={["FilterGrade", "Envato Elements", "Artlist", "Artgrid"]}
    />
  );
}
