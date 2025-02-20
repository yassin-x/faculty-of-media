import { getAllHero } from "@/server/db/heroData";
import Hero from "./_components/Hero";
import About from "./_components/About";
import { getAllAbout } from "@/server/db/aboutData";
import { getAllEvents } from "@/server/db/eventsData";
import Events from "./_components/Events";
import { getAllFAQ } from "@/server/db/FAQData";
import FAQ from "./_components/FAQ";

export default async function Home() {
  const hero = await getAllHero();
  const about = await getAllAbout();
  const events = await getAllEvents();
  const faq = await getAllFAQ();
  return (
    <main>
      <Hero data={hero} />
      <About data={about} />
      <Events data={events} />
      <FAQ data={faq} />
    </main>
  );
}
