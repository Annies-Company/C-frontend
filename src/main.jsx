import React from "react";
import { createRoot } from "react-dom/client";
import { loadSite } from "./api.js";

// Load the saved menu and settings first, then import the app, so every
// module that reads data.js is evaluated against the live data.
loadSite().then(async () => {
  const { default: App } = await import("./App.jsx");
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
