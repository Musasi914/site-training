import { Link } from "react-router-dom";
import { pageList } from "./router/pageList";

export default function Home() {
  return (
    <div className="grid gap-4 p-4">
      {pageList.map((page) => {
        return page.path === "/" ? (
          <div key={page.path} className="my-8">
            <h2 className="text-2xl font-bold">練習場</h2>
            <p>アニメーション・サイト練習</p>
          </div>
        ) : (
          <Link
            className="border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100"
            to={page.path}
            key={page.path}
          >
            <h2 className="text-2xl font-bold">{page.title}</h2>
            <p>{page.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
