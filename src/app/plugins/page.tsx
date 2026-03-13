import CodeIcon from "@mui/icons-material/Code";
import ComingSoon from "@/components/ComingSoon";

export default function PluginsPage() {
  return (
    <ComingSoon
      title="Code & Plugins"
      icon={<CodeIcon sx={{ fontSize: 40 }} />}
      color="#22C55E"
      description="React components, Python scripts, Shopify apps, WordPress plugins & automation tools — the building blocks for your next project."
      sources={["CodeCanyon", "Elementor", "WP Rocket"]}
    />
  );
}
