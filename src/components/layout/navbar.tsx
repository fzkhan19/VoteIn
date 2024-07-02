"use client";
import {Home, Menu, Vote} from "lucide-react";
import Link from "next/link";
import React from "react";

import {cn} from "@/lib/utils";

import Indicator from "../indicator";
import {Button} from "../ui/button";
import {Separator} from "../ui/separator";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "../ui/sheet";

import {ToggleTheme} from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

// interface FeatureProps {
//   title: string;
//   description: string;
// }

const routeList: RouteProps[] = [
  // {
  //   href: "#testimonials",
  //   label: "Testimonials",
  // },
  // {
  //   href: "#team",
  //   label: "Team",
  // },
  // {
  //   href: "#contact",
  //   label: "Contact",
  // },
  // {
  //   href: "#faq",
  //   label: "FAQ",
  // },
];

// const featureList: FeatureProps[] = [
//   {
//     title: "Showcase Your Value ",
//     description: "Highlight how your product solves user problems.",
//   },
//   {
//     title: "Build Trust",
//     description: "Leverages social proof elements to establish trust and credibility.",
//   },
//   {
//     title: "Capture Leads",
//     description: "Make your lead capture form visually appealing and strategically.",
//   },
// ];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between",
        "rounded-2xl border border-secondary p-4",
        "shadow-[0_0px_10px_rgb(0,0,0,0.2)] shadow-primary/30",
        "border-0",
        "md:top-10 md:w-[70%] lg:w-[75%] lg:max-w-screen-xl",
        "bg-white/20 saturate-150 backdrop-blur backdrop-contrast-125 dark:bg-black/20",
      )}
    >
      <Link className="flex items-center px-2 text-lg font-bold" href="/">
        <Vote
          className="mr-3 rounded-md border border-secondary bg-gradient-to-tr from-primary via-primary/80 to-primary p-0.5 text-primary-foreground"
          size={34}
        />
        Vote-In
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer lg:hidden" onClick={() => setIsOpen(!isOpen)} />
          </SheetTrigger>
          <SheetContent
            className="flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card"
            side="left"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link className="flex items-center" href="/">
                    <Vote className="mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/80 to-primary text-primary-foreground" />
                    Vote In
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({href, label}) => (
                  <Button
                    key={href}
                    asChild
                    className="justify-start text-base"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      {/* <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  src="https://avatars.githubusercontent.com/u/75042455?v=4"
                  alt="RadixLogo"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}

      <div className="hidden items-center lg:flex">
        <Indicator />
        <Link className="mx-3" href={"/"}>
          <Button className="w-full justify-start" size="sm" variant="ghost">
            <Home className="size-5" />
          </Button>
        </Link>
        <ToggleTheme />
      </div>
    </header>
  );
};
