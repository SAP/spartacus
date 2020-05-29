# Getting Started

Spartacus dev-schematics is a set of collections including pre-defined configurations, like context with base sites or routing.

## Prerequisites

There might be situations, where you want to use the `@spartacus/schematics` that hasn't been released yet (e.g. the public API is not up-to-date). You can test it locally by following steps:

1. Launch local verdaccio in yours terminal with command `verdaccio`
2. **(Optional step)**: From project root go to `/projects/schematics` and change lib version in package.json file (for local testing purposes only, please remember to revert it before committing any changes)
3. Now (in new terminal or tab) go to dev-schematics scripts: `/projects/dev-schematics/scripts`
4. Run `./test-dev-schematics-local.sh <version>` where `<version>` is **optional** argument for providing schematics version if it was changed in optional step (`projects/schematics/package.json`). The script will perform all necessary steps to ensure up to date schematics version on your local verdaccio. When the script finishes running, you should be ready to test your dev-schematics.

For dev-schematics to be applied properly, you need an Angular application with Spartacus installed.

## Adding dev-schematics to your Spartacus project

Make sure that you have `.npmrc` in the root of your testing project, and that it contains the following content: `@spartacus:registry=http://localhost:4873`.

Run the following command from dev-schematics project:

`ng add @spartacus/dev-schematics --baseSites --routing --outlets`

> NOTE: Please be aware that dev-schematics without params is an empty shell that doesn't perform any actions.

### Available options

Options are provided as flags for main install command as `--<option>`:

- `baseSites`: Adds pre-defined base site list to the app module
- `routing`: Adds pre-defined routing to the app module
- `outlets`: Adds testing outlets module to app module. **NOTE:** If you plan to use testing outlets module, please remember to run `outlet-template-files.sh` bash script beforehand, as it will ensure up to date testing module files to be applied.

### Other commands (extending existing apps)

Providing configuration/functionality via params for `ng add` is the main course of action, but sometimes you will want to extend the current state. It can be achieved by invoking collections for particular configurations:

- `ng g @spartacus/dev-schematics:add-baseSites` - provides set of base sites with context

- `ng g @spartacus/dev-schematics:add-routing` - provides basic routing for testing

- `ng g @spartacus/dev-schematics:add-test-outlets` - provides modules and files for outlets testing

### Available scripts

For ease of usage we provide scripts for smoother installation process:

`./outlet-template-files.sh` - takes care of copying and moving up to date test outlets module files from `projects/storefrontapp`.
This script is ran as part of the `build` script (see `projects/dev-schematics/package.json`), and there's no need to run it manually.
