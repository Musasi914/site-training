import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Site1 from "./sites/site1/site1.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site1 />
  </StrictMode>
);
