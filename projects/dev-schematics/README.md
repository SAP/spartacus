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

Alternative method of installing dev-schematics can be achieved through *verdaccio*, about which you can read more here: [Using verdaccio for local development](https://github.com/SAP/spartacus/tree/develop/projects/schematics#testing-update-schematic)

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

1. Run bash script from source, ensuring up to date test outlets files
    - `cd projects/dev-schematics/scripts && ./outlet-template-files.sh`
1. Build and pack dev-schematics project from source:
    - `cd projects/dev-schematics && yarn build && npm pack`
2. Create new Angular app (or go to existing one):
    - `ng new test-dev-schematics-app --style=scss`
3. Apply Spartacus lib (no matter if 1.5 or 2.0, should be applicable to both)
    - `ng add @spartacus/schematics`
4. Add built dev-schematics package from local machine:
    - `ng add <path-to-spartacus-dev-schematics-x.x.x.tgz --baseSites --routing --outlets`


