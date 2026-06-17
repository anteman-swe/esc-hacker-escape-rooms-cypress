import { defineConfig } from "cypress";

export default defineConfig({
    allowCypressEnv: false,
  e2e: {
    // Här sätter vi bas-URL för localhost som standard
    baseUrl: "http://localhost:5501/dist",
    supportFile: false,

    // VG-fix: Vi kan skicka med miljöspecifika variabler om vi vill,
    // men det smidigaste är att bara skriva över baseUrl från terminalen sen!
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
