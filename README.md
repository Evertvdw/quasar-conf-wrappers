# Quasar App (quasar-conf-wrappers)

This repository showcases two ways to wrap and extend Quasar components using typescript.

Branch `option-1` contains the first way to do it, using `unplugin-vue-component` and inferred typings from the wrapped file. This is also the code present in the `main` branch.

Branch `option-2` contains the second way, defining a global component using a boot file that can be used anywhere in the code.

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
