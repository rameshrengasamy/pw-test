import { defineConfig, devices } from '@playwright/test';
import { timeouts, paths } from './support/constants';

import {
  localHostUrl,
  appUrl,
  runLocalServerAndTest,
  localServerPath,
  localServerStartCommand,
} from './support/env';

export default defineConfig({
  testDir: paths.rootPath,
  outputDir: '../results/artifacts/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: timeouts.testTimeout,
  expect: {
    timeout: timeouts.expectTimeout,
  },
  globalTimeout: timeouts.globalTimeout,
  reporter: [
    ['list'],
    ['html', { outputFolder: '../results/html/', open: 'never' }],
  ],
  use: {
    baseURL: appUrl,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    actionTimeout: timeouts.actionTimeout,
    navigationTimeout: timeouts.navigationTimeout,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
  ],

  ...(runLocalServerAndTest && {
    webServer: {
      command: `cd ${localServerPath} &&  ${localServerStartCommand}`,
      url: localHostUrl,
    },
  }),
});
