import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
  defaultCommandTimeout: 10000,
  requestTimeout: 5000,
  responseTimeout: 2000,

  viewportWidth: 1920,
  viewportHeight: 960,

  retries: {
    runMode: 1,
    openMode: 0,
  },
});
