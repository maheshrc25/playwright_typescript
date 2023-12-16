import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
 // globalSetup: "./swaglab/tests/global-setup",

  testMatch: ["*.ts"],
  /* Maximum time one test can run for. */
  
  globalTimeout: 60 * 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1: undefined,

  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 50 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line',{ printSteps: true }],
             ['json', { outputFile: 'test-results.json' }],
             ['html', { outputFolder: 'my-report' }], 
             ['allure-playwright']],

  use: {
    headless: false,
    screenshot: 'on',
    actionTimeout: 0,
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 900 },
    channel: "chrome",
    video: "on",
    launchOptions: {
      devtools: false
  },
  contextOptions:{
      recordVideo: {
          dir: "../test-results/"
      }
  },
   
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ]
 
};

export default config;
