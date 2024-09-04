import { TbBrandGoogleHome } from "react-icons/tb";
import { SiThemoviedatabase } from "react-icons/si";
import { PiListPlusFill } from "react-icons/pi";
import { ImSearch } from "react-icons/im";

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
