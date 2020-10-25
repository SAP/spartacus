# Getting Started

Spartacus dev-schematics is a set of collections including pre-defined configurations, like context with base sites or routing.

## Prerequisites

For dev-schematics to be applied properly, you need an Angular application with Spartacus installed.

### Prerequisites for local testing

Note: there might be a situation where you want to use the `@spartacus/schematics` that hasn't been released yet (e.g. its public API is not up-to-date).
This can be solved by using `verdaccio`.

These are the steps to take in order to test both `@spartacus/schematics` and `spartacus/dev-schematics` locally:

1. Launch local verdaccio in yours terminal with command `verdaccio`
2. **(Optional step)**: From the project's root navigate to `/projects/schematics` and change the lib version in package.json file (this is for the local testing purposes only, please remember to revert it before committing any changes)
3. In the new terminal, navigate to the dev-schematics scripts: `$ cd /projects/dev-schematics/scripts`
4. Run `./test-dev-schematics-local.sh [version]` where `version` is an **optional** argument for specifying the schematics version. Only provide this if it was changed in the 2nd optional step. When the script runs, you should be ready to test your dev-schematics changes.

## Adding dev-schematics to your Spartacus project

Make sure that:


- Spartacus is already added to you project
- you have `.npmrc` in the root of your testing project, that it contains the following content: `@spartacus:registry=http://localhost:4873`.

Run the following command from dev-schematics project:

`ng add @spartacus/dev-schematics --baseSites --routing --outlets`

> NOTE: Please be aware that dev-schematics without params is an empty shell that doesn't perform any actions.

### Available options

Options are provided as flags for main install command as `--<option>`:

- `baseSites`: Adds pre-defined base site list to the app module
- `routing`: Adds pre-defined routing to the app module
- `outlets`: Adds testing outlets module to app module with all necessary files within that module. **NOTE:** We provide `outlet-template-files.sh` bash script, allowing you to manually update outlets files/folders if needed.

### Other commands (extending existing apps)

Providing configuration/functionality via params for `ng add` is the main course of action, but sometimes you will want to extend the current state. It can be achieved by invoking collections for particular configurations:

- `ng g @spartacus/dev-schematics:add-baseSites` - provides set of base sites with context

- `ng g @spartacus/dev-schematics:add-routing` - provides basic routing for testing

- `ng g @spartacus/dev-schematics:add-test-outlets` - provides modules and files for outlets testing

### Available scripts

For ease of usage we provide scripts for a smoother installation process:

`./outlet-template-files.sh` - takes care of copying and moving up to date test outlets module files from `projects/storefrontapp`.

`./test-dev-schematics-local.sh` - performs all necessary steps for testing dev-schematics locally including re-publishing schematics to local verdaccio, changing the registry to local, and installing Spartacus schematics. Requires verdaccio running locally.
