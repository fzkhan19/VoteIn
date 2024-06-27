"use client";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

import CurrentTopics from "@/components/layout/sections/CurrentTopics";
import {HeroSection} from "@/components/layout/sections/hero";
import Particles from "@/components/ui/particles";

export default function Home() {
  const {theme} = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <HeroSection />
      <CurrentTopics />
      <Particles
        refresh
        className="absolute inset-0 -z-10"
        color={color}
        ease={80}
        quantity={100}
      />
    </div>
  );
}
