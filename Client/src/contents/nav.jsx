import { TbBrandGoogleHome } from "react-icons/tb";
import { SiThemoviedatabase } from "react-icons/si";
import { PiListPlusFill } from "react-icons/pi";
import { ImSearch } from "react-icons/im";
import { SiGooglegemini } from "react-icons/si";

export const nav = [
  {
    label: "Movies",
    href: "movie",
    icons: <SiThemoviedatabase />,
  },
  {
    label: "My List",
    href: "mylist",
    icons: <PiListPlusFill />,
  },
  {
    label: "Gemini AI",
    href: "gemini",
    icons: <SiGooglegemini />,
  },
];
export const mobileNav = [
  {
    label: "Home",
    href: "/",
    icons: <TbBrandGoogleHome />,
  },
  ...nav,
  {
    label: "Search",
    href: "/search",
    icons: <ImSearch />,
  },
];
