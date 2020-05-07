# Installation Script for Spartacus

Utilities and scripts to automate the Spartacus installation steps. Some of them are:

- Build Spartacus libraries from source
- Create a new shell app for the Spartacus libraries
- Install the libraries in the new shell app
- Add custom configurations to the shell app
- Install spartacus in production mode
- Install Spartacus in SSR mode
- Install Spartacus in remote servers (using Ansible)

To use the scripts, clone this git repo and follow the usage indications below.

## Install Spartacus

```bash
cd ./scripts/install && ./run.sh install
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

This command starts a development server for Spartacus, which is under `"${BASE_DIR}/apps/csr"` by default.

## Stop Spartacus

```bash
./run.sh stop
```

This command stops the running Spartacus using its PID.

## Update Spartacus

Just run the installation again (stop it first if it's running).

```bash
./run.sh stop
./run.sh install (script ask you to rename/delete the `$BASE_DIR` if it exists)
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
