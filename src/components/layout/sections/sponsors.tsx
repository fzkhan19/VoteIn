"use client";

import {Icon} from "@/components/ui/icon";

import {Marquee} from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import {icons} from "lucide-react";
interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "Crown",
    name: "Acmebrand",
  },
  {
    icon: "Vegan",
    name: "Acmelogo",
  },
  {
    icon: "Ghost",
    name: "Acmesponsor",
  },
  {
    icon: "Puzzle",
    name: "Acmeipsum",
  },
  {
    icon: "Squirrel",
    name: "Acme",
  },
  {
    icon: "Cookie",
    name: "Accmee",
  },
  {
    icon: "Drama",
    name: "Acmetech",
  },
];

export const SponsorsSection = () => {
  return (
    <section className="mx-auto max-w-[75%] pb-24 sm:pb-32" id="sponsors">
      <h2 className="mb-6 text-center text-lg md:text-xl">Our Platinum Sponsors</h2>

      <div className="mx-auto">
        <Marquee fade className="gap-[3rem]" innerClassName="gap-[3rem]">
          {sponsors.map(({icon, name}) => (
            <div key={name} className="flex items-center text-xl font-medium md:text-2xl">
              <Icon className="mr-2" color="white" name={icon as keyof typeof icons} size={32} />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
