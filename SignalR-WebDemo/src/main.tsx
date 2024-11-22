import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <Notifications />
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
