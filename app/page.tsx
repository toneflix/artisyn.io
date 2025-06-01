import Hero from "@/components/landing/sections/hero";
import HowItWorks from "@/components/landing/sections/how-it-works";
import BrowseByCategory from "@/components/landing/sections/browse-by-category";
import ThemeManager from "@/components/ThemeManager";
function Page() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <BrowseByCategory />
      <ThemeManager />
    </div>
  );
}

export default Page;
