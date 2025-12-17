import Home from "../Home.tsx";
import Site1 from "../sites/site1/site1.tsx";
import Site2 from "../sites/site2/site2.tsx";
import Site3 from "../sites/Site3.tsx";
import Site4 from "../sites/Site4.tsx";
import Site5 from "../sites/Site5.tsx";

type PageConfig = {
  path: string;
  component: React.ComponentType;
  title: string;
  description: string;
};

export const pageList: PageConfig[] = [
  {
    path: "/",
    component: Home,
    title: "Home",
    description: "Home page",
  },
  {
    path: "/site1",
    component: Site1,
    title: "Site1",
    description: "スクロールでテキスト要素がサーチバーになったり",
  },
  {
    path: "/site2",
    component: Site2,
    title: "高さ切り替えカード",
    description: "heightの変化",
  },
  {
    path: "/site3",
    component: Site3,
    title: "カラフルテキスト",
    description: "tailwind animation",
  },
  {
    path: "/site4",
    component: Site4,
    title: "clip-path",
    description: "clip-path",
  },
  {
    path: "/site5",
    component: Site5,
    title: "text-shadow",
    description: "text-shadowの理解を深める",
  },
];
