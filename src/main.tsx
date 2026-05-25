import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initEncatch } from "@/lib/encatch";
import "./index.css";

initEncatch(); // _encatch.init + _encatch.startSession

createRoot(document.getElementById("root")!).render(<App />);
