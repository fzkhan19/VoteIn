import {Icons} from "@/components/Icons";
import TopicCreator from "@/components/TopicCreator";

export const HeroSection = () => {
  return (
    <section className="w-full md:container">
      <div className="mx-auto grid h-screen place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
            <h1>
              What do you
              <span className="whitespace-nowrap bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent">
                th
                <span className="relative bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text text-transparent">
                  i
                  <span className="absolute inset-x-0 top-[-2px] -translate-x-3">
                    <Icons.brain className="h-6 w-6 md:h-7 md:w-7" />
                  </span>
                </span>
                nk
              </span>{" "}
              about...
            </h1>
          </div>
        </div>
        <TopicCreator />
      </div>
    </section>
  );
};
