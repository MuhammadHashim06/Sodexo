import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header></Header>
    <Hero></Hero>
  </StrictMode>
);
