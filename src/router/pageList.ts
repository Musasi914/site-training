import Home from "../Home.tsx";
import Site1 from "../sites/site1/site1.tsx";
import Site2 from "../practice/site2/site2.tsx";
import Site3 from "../practice/Site3.tsx";
import Site4 from "../practice/Site4.tsx";
import Site5 from "../practice/Site5.tsx";
import Site6 from "../practice/Site6.tsx";
import SSite2 from "../sites/Site2.tsx";

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
    path: "/ssite2",
    component: SSite2,
    title: "Site2",
    description: "スクロール動画練習",
  },
  {
    path: "/site4",
    component: Site4,
    title: "clip-path",
    description: "clip-path",
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
    path: "/site5",
    component: Site5,
    title: "text-shadow",
    description: "text-shadowの理解を深める",
  },
  {
    path: "/site6",
    component: Site6,
    title: "グリッチ",
    description: "background-position:fixedが鍵",
  },
];
