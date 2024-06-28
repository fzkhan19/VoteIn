import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";

import {Button} from "../ui/button";

export const ToggleTheme = () => {
  const {theme, setTheme} = useTheme();

  return (
    <Button
      className=" justify-start"
      size="sm"
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" />
        <span className="block lg:hidden"> Escuro </span>
      </div>

      <div className="hidden gap-2 dark:flex">
        <Sun className="size-5" />
        <span className="block lg:hidden">Claro</span>
      </div>

      <span className="sr-only">Trocar de tema</span>
    </Button>
  );
};
