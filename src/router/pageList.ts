import Home from "../Home.tsx";
import Site1 from "../sites/site1/site1.tsx";
import Site2 from "../sites/site2/site2.tsx";
import Site3 from "../sites/Site3.tsx";

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
    title: "Site2",
    description: "高さ切り替えカード",
  },
  {
    path: "/site3",
    component: Site3,
    title: "Site3",
    description: "カラフルテキスト",
  },
];
