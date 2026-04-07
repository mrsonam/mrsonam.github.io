import type { ExperiencePublic } from "@/lib/content";
import ExperienceTimeline from "./ExperienceTimeline";

type Props = {
  experiences: ExperiencePublic[];
};

export default function ExperienceSection({ experiences }: Props) {
  return (
    <section
      id="experience"
      className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 mb-12 md:mb-24 overflow-x-hidden"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">
          Professional
          <br />
          <span className="text-muted-foreground">Experience.</span>
        </h2>
      </div>
      <ExperienceTimeline experiences={experiences} />
    </section>
  );
}
