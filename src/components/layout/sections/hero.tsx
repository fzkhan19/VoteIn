import {Icons} from "@/components/Icons";
import TopicCreator from "@/components/TopicCreator";

export const HeroSection = () => {
  return (
    <section className="md:container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl h-screen gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              What do you
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text whitespace-nowrap">
                th
                <span className="relative text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
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
