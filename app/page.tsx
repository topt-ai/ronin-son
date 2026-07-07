import Hero from "@/components/chapters/Hero";
import Steel from "@/components/chapters/Steel";
import Fire from "@/components/chapters/Fire";
import Fold from "@/components/chapters/Fold";
import Edge from "@/components/chapters/Edge";
import Saya from "@/components/chapters/Saya";
import BrushDivider from "@/components/BrushDivider";
import ChapterMarker from "@/components/ChapterMarker";

export default function Home() {
  return (
    <main>
      <ChapterMarker />
      <Hero />
      <BrushDivider />
      <Steel />
      <BrushDivider flip />
      <Fire />
      <BrushDivider />
      <Fold />
      <BrushDivider flip />
      <Edge />
      <BrushDivider />
      <Saya />
    </main>
  );
}
