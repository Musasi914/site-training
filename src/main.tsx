import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { pageList } from "./router/pageList.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {pageList.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<page.component />}
          />
        ))}
      </Routes>
    </Router>
  </StrictMode>
);
