import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ComingSoon from "@/components/ComingSoon";

export default function UIKitsPage() {
  return (
    <ComingSoon
      title="Premium UI Kits"
      icon={<DashboardCustomizeIcon sx={{ fontSize: 40 }} />}
      color="#00B2CC"
      description="Beautiful app UI kits, dashboard designs, Figma systems & wireframe bundles — curated from top design marketplaces."
      sources={["UI8", "Creative Market"]}
    />
  );
}
