import SvgsIcons from "@/components/ui/icons/icon";

const howItWorksSteps = [
  {
    title: "Choose a Service",
    description:
      "Pick from a wide range of categories—from plumbing to painting.",
    Icon: SvgsIcons.chisel,
  },
  {
    title: "Connect with Pros",
    description: "Review profiles, compare offers, and chat with artisans.",
    Icon: SvgsIcons.heart,
  },
  {
    title: "Complete Your Job",
    description: "Hire confidently and get quality work done on time.",
    Icon: SvgsIcons.checking,
  },
];

function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center px-10 py-16 min-h-svh">
      <div className="text-center max-w-3xl leading-tight">
        <h1 className="mt-1  font-medium text-xl">How it works</h1>
        <p className="mt-1 text-secondary-foreground font-bold text-[56px]">
          Finding Artisans has Never Been Easier
        </p>
        <p className="mt-6  md:max-w-[70%] mx-auto">
          Your neighborhood’s best artisans, all in one place. Search, compare
          offers, and hire with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 md:gap-16 max-w-4xl mt-12">
        {howItWorksSteps.map((step, index) => (
          <Cards key={index} {...step} />
        ))}
      </div>
    </section>
  );
}

const Cards = ({
  title,
  description,
  Icon,
}: (typeof howItWorksSteps)[number]) => {
  return (
    <div className="flex flex-col items-center gap-4 border border-[#E2E8F0] p-4 pt-14 rounded-[12px] text-center">
      <div className="relative text-[#0F243D] dark:text-[#4A6D94]">
        <Icon className="w-22 relative z-10" />
        <span className="absolute left-[34%] bottom-[10%] w-[115px] h-[115px] bg-[#D6DDE6] rounded-full" />
      </div>

      <div className="">
        <h2 className="text-secondary-foreground font-medium text-2xl">
          {title}
        </h2>
        <p className="mt-2 ">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
