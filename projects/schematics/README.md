# Getting Started

Spartacus schematics allows you to install Spartacus libraries in your project

## Adding Spartacus libraries to your Angular project

Run the following command from your project root:

`ng add @spartacus/schematics`

### Available options

- `baseUrl`: Base url of your CX OCC backend
- `baseSite`: Name of your base site
- `occPrefix`: The OCC API prefix. E.g.: /occ/v2/
- `useMetaTags`: Whether or not to configure baseUrl and mediaUrl in the meta tags from `index.html`
- `featureLevel`: Application feature level. (default: _2.0_)
- `overwriteAppComponent`: Overwrite content of app.component.html file. (default: true)
- `pwa`: Include PWA features while constructing application.
- `ssr`: Include Server-side Rendering configuration.

### Other commands

By defaut `ng add @spartacus/schematics` will add only basic spartacus configuration. You are able extend application with features like *PWA* or *SSR* with commands listed below:

- `ng g @spartacus/schematics:add-pwa` - adds Spartacus-specific PWA module
- `ng g @spartacus/schematics:add-ssr` - adds server-side rendering configuration
- `ng g @spartacus/schematics:add-cms-component` - generates a cms component, and adds the CMS component mapping to the specified module (or generates a new module). For more see [CMS component schematic](#CMS-component-schematic)

## Steps performed by Spartacus schematics

1. Add required dependencies
2. Import Spartacus modules in app.module and setup default configuration
3. Import Spartacus styles to main.scss
4. Add `cx-storefront` component to your app.component
5. (Optionally) update index.html with Spartacus URL endpoints in meta tags
6. If `--pwa` flag included:
    - Add PWA/ServiceWorker support for your project
7. If `--ssr` flag included:
    - Add ssr dependencies
    - Provide additional files required for SSR

## CMS component schematic

### Available options for CMS component schematic

The following options are available:

- `--declareCmsModule` - specifies to which module to add the newly generated CMS component. If omitted, a new module is generated.
- `--cmsComponentData`, alias `--cms` - inject the _CmsComponentData_ in the new component. By default it is _true_
- `--cmsComponentDataModel`, alias `--cms-model` - Specify the model class for the _CmsComponentData_, e.g. _MyModel_. This argument is required if _--cmsComponentData_ is _true_.
- `--cmsComponentDataModelPath`, `--cms-model-path` - Specify the import path for the _CmsComponentData_. Default is _@spartacus/core_.

Besides the custom options, the `add-cms-component` supports almost all options that are available for the Angular's component and module schematics. The full list can be seen [here](https://github.com/SAP/cloud-commerce-spartacus-storefront/blob/develop/projects/schematics/src/add-cms-component/schema.json).

The following Angular's options are _not_ supported:

- deprecated options.
- _--module_ option for component - if you want to specify an existing module for the component, use _--declareCmsModule_. The _module_ option is only applied to the Angular's _module_ schematic.
- _--skipImport_ option.

### Examples

Here are some examples how the `add-cms-component` schematic can be used:

- `ng g @spartacus/schematics:add-cms-component myAwesomeCms --cms-model=MyModel` - generates _my-awesome-cms.component.ts_ component and _my-awesome-cms.module.ts_ module
- `ng g @spartacus/schematics:add-cms-component myAwesomeCms --cms-model=MyModel --declareCmsModule=my-cms-path/my-cms` - generates _my-awesome-cms.component.ts_ and adds it to the specified _my-cms-path/my-cms.module.ts._'s CMS mapping.
- `ng g @spartacus/schematics:add-cms-component myAwesomeCms --cms-model=MyModel --module=app` - generates _my-awesome-cms.component.ts_ component, _my-awesome-cms.module.ts_ module and imports it to the specified _app.module.ts_
- `ng g @spartacus/schematics:add-cms-component myAwesomeCms --cms-model=MyModel --module=app --declareCmsModule=my-cms-path/my-cms` - generates _my-awesome-cms.component.ts_ component and adds it to the specified _my-cms-path/my-cms.module.ts_ module. It also imports _my-cms.module.ts_ to the specified _app.module.ts_

## Prerequisites

Install angular schematics globally: `npm install -g @angular-devkit/schematics-cli`.

Navigate to `$ cd projects/schematics` and install the dependencies using `$ yarn install`.

## Testing schematics

### Unit testing

To run schematics unit tests:

1. `$ cd projects/schematics`
2. `$ yarn` - to install dependencies
3. `$ yarn test`

### Integration testing

The best way to test an unpublished schematic is to publish it to a local npm registry. For more, see [developing update schematics](#Developing-update-schematics)

## Developing update schematics

### Verdaccio setup

To setup a local npm registry, we're going to use [verdaccio](https://github.com/verdaccio/verdaccio). To set it up, do the following:

- install it: `npm install --global verdaccio`
- run it in a new terminal tab / window: `verdaccio`
- create an npm user: `npm adduser --registry http://localhost:4873`. This is only needed when setting up _verdaccio_ for the first time.

### Using verdaccio

Create a new angular project:

- `ng new spartacus-schematics-test` and `cd spartacus-schematics-test`
- add Spartacus by running e.g. `ng add @spartacus/schematics@<version> --baseUrl https://storefront.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com --baseSite electronics-spa`. Note the `<version>` after `ng add @spartacus/schematics`. This should be lower than the one you're going to publish. E.g. if developing schematics for Spartacus 3.0, then you should install Spartacus 2.0.
- create `.npmrc` in the root of the project and paste the following content to it: `@spartacus:registry=http://localhost:4873` to point to the local npm server only for the `@spartacus` scoped packages. From this moment on, `@spartacus` scoped packages will use the local npm registry.
- commit the changes, if any.

You can now run any Spartacus schematics related command, e.g. `ng add @spartacus/schematics` or `ng update @spartacus/schematics`, and angular will pull the Spartacus schematics lib from _verdaccio_ instead from the public _npm_ registry.

The next step is to publish libraries to _verdaccio_.

### Publishing to verdaccio

The simplest way to publish Spartacus libraries to _verdaccio_ is to use `scripts/migrations-test.sh` script.

> Before running the script, make sure _verdaccio_ is running: `$ verdaccio`.

To use it, just run `./migrations-test.sh`. This will build _all_ the relevant spartacus libs and publish them to _verdaccio_.

> NOTE: if _verdaccio_ refuses to publish libraries, and shows an error that says that the lib is already published with the same version, the quickest way around this seems to be [this](https://github.com/verdaccio/verdaccio/issues/1203#issuecomment-457361429) - open `nano ~/.config/verdaccio/config.yaml` and under `packages: '@*/*':` sections, comment out the `proxy: npmjs` line. After doing this, you should be able to publish the packages.

#### Iterative development

As building all the Spartacus libraries every time you make a change to the schematics project takes time, it's not very convenient for iterative development. For this reason, you can run the script with `skip` flag - `./migrations-test.sh skip`. This will skip building of all Spartacus libraries except the schematics, and it will unpublish and publish all the libraries again to _verdaccio_.

When doing iterative development of the update schematics, it's for the best to do the following before testing the changes:

- in the testing project:
  - revert the `package.json` and `yarn.lock` changes
  - delete the old `node_modules` folder and install the dependencies again: `rm -rf node_modules/ && yarn`
  - run the `ng update @spartacus/schematics` command

## Update schematics

### The update schematic structure

The `projects/schematics/src/migrations/migrations.json` file contains all migration scripts for all Spartacus versions:

- _name_ property is important for developers to quickly understand what the migration script is doing. By convention, the migration _name_ should follow `migration-v<version>-<migration-feature-name>-<sequence-number>` pattern, where:
  - _version_ should indicate for which Spartacus version the migration is intended.
  - _migration-feature-name_ is a short name that describes what the migration is doing.
  - _sequence-number_ is the sequence number in which the migrations should be executed
  - An example is _migration-v2-update-cms-component-state-02_.
- _version_ is _really_ important for the Angular's update mechanism, as it is used to automatically execute the required migration scripts for the current project's version. For more information about this, please check [releasing update schematics](#releasing-update-schematics) section.
- _factory_ - points to the specific migration script.
- _description_ - a short free-form description field for developers.

### Validations

If some validations are required to be ran before actually upgrading the Spartacus version, the "migration script" located in `projects/schematics/src/migrations/2_0/validate.ts` can be used.

### Constructor deprecation

The `projects/schematics/src/migrations/2_0/constructor-deprecations.ts` performs the constructor migration tasks. Usually, a developer does not need to touch this file, but they should rather describe the constructor deprecation in `projects/schematics/src/migrations/2_0/constructor-deprecation-data.ts`. The constant `CONSTRUCTOR_DEPRECATION_DATA` describes the deprecated constructor and has `addParams` and `removeParams` properties in which you can specify which parameters should be added or removed, respectively.

### Commenting code

Another common case is to place a comment in customer's code base, describing what should they do in order to upgrade to a new Spartacus version. We should do this only in cases where upgrading manually is easy, but writing a migration script would be too complex.
The `projects/schematics/src/shared/utils/file-utils.ts#insertCommentAboveIdentifier` method will add comment above the specified _identifier_ TypeScript node.

Some examples:

- adding a comment above the removed API method, guiding customers which method they can use instead.
- adding a comment above the Ngrx action in which we changed parameters

### Component deprecation

Similar to [constructor deprecation](#Constructor-deprecation), `projects/schematics/src/migrations/2_0/component-deprecations.ts` performs the component migration tasks, for both component _*.ts_ and _HTML_ templates. Usually, a developer does not need to touch this file, and they should rather describe the component deprecation in `projects/schematics/src/migrations/2_0/component-deprecations-data.ts`. The constant `COMPONENT_DEPRECATION_DATA` describes the deprecated components.

### CSS

To handle CSS changes, we are printing a link to the CSS docs, where customers can look up which CSS selectors have changed between Spartacus versions. For this reason, if making a change to a CSS selector, please update this docs. (link to follow).

## Releasing update schematics

This section is for developers who do the release, and it specifies how to manage the versions in `projects/schematics/src/migrations/migrations.json`.

The migration scripts that are listed here should be executed each time customers perform the automatic upgrade by running `ng update @spartacus/schematics --next`:

- `migration-v2-validate-01`
- `migration-v2-methods-and-properties-deprecations-02`
- `migration-v2-constructor-deprecations-03`
- `migration-v2-removed-public-api-deprecation-04`
- `migration-v2-component-deprecations-05`
- `migration-v2-css-06`
- `migration-v2-config-deprecations-09`

Please bump the `version` in `migration.json` only for the migration scripts listed above, and _do not change the other script's versions_.

This is _really_ important for the Angular's update mechanism, as it is used to automatically execute the required migration scripts for the current project's version.
It's also important to note that after we release a Spartacus _next.x_, or an _rc.x_ version, all the migration scripts that are written after the release _have_ to specify the future release version.
E.g. if Spartacus _2.0.0-next.1_ has been released, then the _new_ migration scripts (added after it _2.0.0-next.1_) should specify the next version (e.g. _2.0.0-next.2_).
This is required for clients that upgrade frequently and it will make angular to run only the new migration scripts for them, avoiding the same scripts to run twice.
However, there are exceptions from this rule - as we have data-driven generic mechanisms for e.g. constructor deprecation, we have to bump the version in `migrations.json` for those scripts.
