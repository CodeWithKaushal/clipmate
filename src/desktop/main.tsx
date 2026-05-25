import { createRoot } from "react-dom/client";
import "@/index.css";
import { DesktopApp } from "./DesktopApp";

createRoot(document.getElementById("root")!).render(<DesktopApp />);
