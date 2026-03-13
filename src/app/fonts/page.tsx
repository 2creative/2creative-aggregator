import TextFieldsIcon from "@mui/icons-material/TextFields";
import ComingSoon from "@/components/ComingSoon";

export default function FontsPage() {
  return (
    <ComingSoon
      title="Creative Fonts"
      icon={<TextFieldsIcon sx={{ fontSize: 40 }} />}
      color="#A855F7"
      description="Trending font families, brutalist typefaces & elegant serifs with proper commercial licences for agencies and independent designers."
      sources={["MyFonts", "Fontspring", "Creative Market"]}
    />
  );
}
