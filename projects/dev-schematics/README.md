# Getting Started

Spartacus dev-schematics is a set of collections including pre-defined configurations, like context with base sites or routing.

## Prerequisites

For dev-schematics to be applied properly, you need an Angular application with Spartacus installed.

## Adding dev-schematics to your Spartacus project

Run the following command from dev-schematics project:

`yarn build && npm pack`

Run the following command from your project root:

`ng add <path to your built spartacus-dev-schematics-x.x.x.tgz file>`

> NOTE: Please be aware that dev-schematics without params is an empty shell that doesn't perform any actions.

An alternative method of installing dev-schematics can be achieved through *verdaccio*, about which you can read more here: [Using verdaccio for local development](https://github.com/SAP/spartacus/tree/develop/projects/schematics#verdaccio-setup)

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


## Example of full dev-schematics implementation for Spartacus project

1. Run `verdaccio` locally in separte terminal / tab
2. Go to dev-schematics scripts and run script responsible for preparing necessary dependencies (including public api from schematics lib):
    - `cd /projects/dev-schematics/scripts && ./test-dev-schematics-local.sh`
3. Build and pack dev-schematics project from source:
    - `cd .. && yarn && yarn build && npm pack`
4. Create new Angular app (or use an existing one):
    - `ng new test-dev-schematics-app --style=scss`
5. Apply Spartacus lib (no matter if 1.5 or 2.0, should be applicable to both)
    - `ng add @spartacus/schematics`
6. Add built dev-schematics package from local machine:
    - `ng add <path-to-spartacus-dev-schematics-x.x.x.tgz --baseSites --routing --outlets`
 
## Testing dev-schematics locally

There might be situations, where you want to add new entities to/from public API of schematics, but the @spartacus/schematics hasn't been released yet. You can test it locally by the following steps:

1. Launch local verdaccio in yours terminal with command `verdaccio` 
2. **(Optional step)**: From the project root go to `/projects/schematics` and change lib version in package.json file (for local testing purposes only, please remember to revert it before committing any changes)
3. Now (in new terminal or tab) go to dev-schematics scripts: `/projects/dev-schematics/scripts`
4. Run `./test-dev-schematics-local.sh <version>` where `<version>` is **optional** argument for providing schematics version if it was changed in optional step (`projects/schematics/package.json`).

The above script will perform all necessary steps to ensure up to date schematics version on your local verdaccio. When the script will complete, you should be ready to test your dev-schematics.


### Available scripts

For ease of usage we provide scripts for a smoother installation process:

`./outlet-template-files.sh` - takes care of copying and moving up to date test outlets module files from `projects/storefrontapp`.

`./test-dev-schematics-local.sh` - performs all necessary steps for testing dev-schematics locally including re-publishing schematics to local verdaccio, changing the registry to local, and installing Spartacus schematics. Requires verdaccio running locally.
