[<img src="https://img.shields.io/badge/BUILT WITH-🎭 PLAYWRIGHT-COLOR.svg?logo=LOGO">](https://playwright.dev/)

# 📖 Table of Contents

- [✨ Overview](#✨-overview)
- [⚠️ Pre-Requisite](#⚠️-pre-requisite)
- [⚡️ Installation](#⚡️-installation)
- [💾 Formatting](#💾-formatting)
- [👀 Linting](#👀-linting)
- [👨‍💻 Usage](#👨‍💻-usage)
- [♻️ CLI Arguments](#♻️-cli-arguments)
- [📄 To Do](#📄-to-do)

</br>

# ✨ Overview

This repo contains playwright based test automation scripts

[🔝](#)

</br>

# ⚠️ Pre-requisite

[nodejs>=18.16.1](https://nodejs.org/en) \
 **Note:** If you use nvm, run `nvm use`

[🔝](#)

</br>

# ⚡️Installation

```bash
  npm install
```

[🔝](#)

</br>

# 💾 Formatting

Prettier is configured for formatting.

```bash
  npm run format
```

[🔝](#)

</br>

# 👀 Linting

ESlint is configured with Cypress plugin rules.

```bash
  npm run lint
```

[🔝](#)

</br>

# 👨‍💻 Usage

To run test scripts

```bash
  # ⚠️ Note: By default runs against http://localhost:3000. Make sure local server is up and running before running the below command. See CLI arguments below for other options.

  npm run test

 # 🎉 After test run is completed, HTML report can be seen under ./results/html folder with index.html file name

```

[🔝](#)

</br>

# ♻️ CLI Arguments

**APP_URL:** Runs tests against provided url.

- **Usage:** APP_URL="" npm run test  
  <br/>

**START_SERVER_TEST:** Starts local server and runs tests against localhost:3000.

- **Usage:** START_SERVER_TEST=true npm run test  
  <br/>

**LOCAL_SERVER_PATH:** Path to where app code is (If custom path, default will just look for one directory behind this e2e)

- **Usage:** LOCAL_SERVER_PATH="" START_SERVER_TEST=true npm run test  
  <br/>

**SERVER_START_COMMAND:** Command to start local dev (If custom, default will be `npm run apitest:serve`)

- **Usage:** SERVER_START_COMMAND="" LOCAL_SERVER_PATH="" START_SERVER_TEST=true npm run test  
  <br/>

[🔝](#)

</br>

# 📄 To Do

[🔝](#)
