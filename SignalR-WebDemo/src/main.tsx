import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <Notifications />
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
