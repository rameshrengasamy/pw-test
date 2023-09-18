import path from 'path';

const localHostUrl = 'http://127.0.0.1:3000';
const appUrl = process.env.APP_URL ? process.env.APP_URL : localHostUrl;
const runLocalServerAndTest = process.env.START_SERVER_TEST ? true : false;

const localServerPath = process.env.LOCAL_SERVER_PATH
  ? process.env.LOCAL_SERVER_PATH
  : path.resolve(`${process.cwd()}/../golden-layout`);

const localServerStartCommand = process.env.SERVER_START_COMMAND
  ? process.env.SERVER_START_COMMAND
  : 'npm run apitest:serve';

export {
  runLocalServerAndTest,
  localHostUrl,
  appUrl,
  localServerPath,
  localServerStartCommand,
};
