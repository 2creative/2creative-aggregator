import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ComingSoon from "@/components/ComingSoon";

export default function ThreeDModelsPage() {
  return (
    <ComingSoon
      title="3D Models & Assets"
      icon={<ViewInArIcon sx={{ fontSize: 40 }} />}
      color="#F59E0B"
      description="Professional 3D models, architectural visualisations, character models & game assets — sourced from the biggest 3D marketplaces."
      sources={["TurboSquid", "CGTrader", "Unity Asset Store", "Unreal Marketplace"]}
    />
  );
}
