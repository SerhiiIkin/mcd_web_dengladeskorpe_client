import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainRouteMain from "@routes/MainRoute";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@fontsource/just-another-hand";
import "@fontsource/kurale";

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MainRouteMain />
    </StrictMode>
);
