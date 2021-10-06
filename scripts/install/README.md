# Installation Script for Spartacus

Installation script does the following:

- Build Spartacus libraries from source
- Create a new shell app for the Spartacus libraries
- Install the libraries in the new shell app
- Add custom configurations to the shell app

It can also:

- Install spartacus in production mode
- Install Spartacus in SSR mode

## Preparing setup
- Install verdaccio `$ npm i -g verdaccio@4` (only for the first time)
- Run it: `$ verdaccio` in one terminal
- Create an npm user in another terminal (when verdaccio is running): `$ npm adduser --registry http://localhost:4873`. After completing the registration of a new user, stop the verdaccio. This setup is only required to do once.

## How to install

Checkout and pull the latest maintenance branch corresponding to the version being released. For example for new `next` release it's `develop` but for `2.1.x` patch release it's `release/2.1.x`.

Installation directory for SpartacusScript's output directory is set as below (related to script's root, `./scripts/install`):

```bash
# top directory for the installation output (must be outside of the project)
if [ -z $BASE_DIR ]; then
    BASE_DIR="../../../spartacus-${SPARTACUS_VERSION}"
fi
```

so it's one level above the spartacus project root. To change the output directory `$BASE_DIR` can be overriden in the `config.sh` file.

All script's commands should be run while being in it's root directory:

```bash
cd ./scripts/install
```

Before running the main script, please ensure that:

- line `//localhost:4873/:_authToken="VNOlucnBmPrXVjzHVEHtWQ=="` is added to the `~/.npmrc` file
- `ANGULAR_CLI_VERSION` variable is set properly in the `config.sh` file (it must meet project's `package.json` `@angular/cli` version requirement)
- `OCC_PREFIX` variable is set to proper value (depends on backend version)
- `ADD_B2B_LIBS` variable is set to true in case you want to add b2b libs (`setup` and `organization` as for `3.0.0-next.1`) to the output apps
- `ADD_PRODUCT_CONFIGURATOR` variable is set to true in case you want to add the product-configurator libs to the output apps
- adjust any other variables available in the `config.default.sh` if needed (by setting them up in the `config.sh`)

Once ready start the installation as below:

```bash
 ./run.sh install
```

The script will build the libraries from source, create a new shell app and install the libraries in it.

By default, Spartacus will be built from the `develop` branch. You can specify a different branch in the `config.sh` file.

The installation will create two folders in the `$BASE_DIR` directory:

- `apps` (generated/executable apps)
- `clone` (cloned Spartacus repo)

## Starting Spartacus

```bash
./run.sh start
```

This command starts a server for Spartacus, which is under `"${BASE_DIR}/apps/csr"` by default.

## Stop Spartacus

```bash
./run.sh stop
```

This command stops the running Spartacus PM2 processes.

## Update Spartacus

Just run the installation again (stop it first if it's running).

```bash
./run.sh stop
./run.sh install (script will delete the `$BASE_DIR` if it exists)
```

## Installing with the latest npm libraries

Instead of building the libraries from source, the build process will just pull the libraries from npm (version specified with `$SPARTACUS_VERSION` - may be `latest`, `next` or `2.0.0-rc.1`, etc...)

```bash
./run.sh install_npm
```

## Chaining commands

You can chain commands using `+`. The main use case for this is to install and start Spartacus in one command:

```bash
./run.sh install+start
```

## Config file

The default configurations for the installation script are in `config.default.sh`.
If you want to use different config values, create a file named `config.sh`
If present, `config.sh` will be loaded in addition so variables will override those from `config.default.sh`.
