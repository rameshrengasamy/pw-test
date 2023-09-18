import path from 'path';

const paths = {
  rootPath: path.resolve(`${process.cwd()}/../../`),
};

const timeouts = {
  actionTimeout: 10000,
  navigationTimeout: 30000,
  globalTimeout: 120000,
  expectTimeout: 10000,
  testTimeout: 30000,
};

export { paths, timeouts };
