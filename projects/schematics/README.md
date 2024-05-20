# Getting Started

This section is for Spartacus developers and anybody else who works with Spartacus source code.
To see the documentation on how to use schematics from a customers perspective, see: [https://sap.github.io/spartacus-docs/schematics](https://sap.github.io/spartacus-docs/schematics)

## Prerequisites

Install angular schematics globally: `npm install -g @angular-devkit/schematics-cli`.
Make sure that Angular CLI is up to date: `npm install -g @angular/cli@latest`

## Testing schematics

### Unit testing

To run all the schematics unit tests:

`$ ./node_modules/ts-node/dist/bin.js ./tools/schematics/testing.ts` and choose `test all schematics` option.

To run schematics tests for a specific library:

1. navigate to the library / project you want to test - e.g. `$ cd feature-libs/asm`
2. Run `$ npm run test:schematics`. _NOTE_ that when testing `projects/schematics`, the command which to run is `$ npm run test`.

The schematics already have unit tests to cover the migration tasks they were designed to perform. However, you might want to test if the new schematics configuration you added will produce the expected result when a user will perform a migration with the help of the schematics without running a full migration on an app, which would be very time consuming. A convenient way to test your new config is to temporarily modify a schematics unit test case and use an example that will use your new config instead. After you assess your migration scenario plays out as expected, you can revert the changes you did in the unit test.

The following points provide guidance on how to achieve that.

- let's say you're working on a constructor deprecation task, in which case you would open the `projects/schematics/src/migrations/mechanism/constructor-deprecations/constructor-deprecations_spec.ts`.
- first thing to change is the `MIGRATION_SCRIPT_NAME`. If you're testing a migration task for v3, you would change the value of the `MIGRATION_SCRIPT_NAME` constant to `migration-v3-constructor-deprecations-03` (notice the **v3** in the name). To see the exact name of the migration script, you can go to `projects/schematics/src/migrations/migrations.json` and copy-paste the script's name you're testing to the spec file.
- next, you can pick and choose a test that's using a class as an input (where the class is a made up testing class from customers' perspective, represented as a string). The output of the test is also a class, modified by the schematics (basically the expected result); again, this class is also represented as a string. Therefore, in case of the constructor deprecation, you can modify e.g. `ADD_AND_REMOVE_PARAMETER_VALID_TEST_CLASS` constant to match your made up input. You can then just `console.log()` the result and assert the migrated code manually in the console.
- in order to save yourself some time, it's recommended to `fdescribe` (or `fit`) the test that's using the constants from the previous step. To run the test(s), follow the steps from the beginning of this section. An additional benefit is that it removes a lot of noise in the terminal, which is especially useful when using `console.log()`ing the result.

### Integration testing

The best way to test an unpublished schematic is to publish it to a local npm registry. For more, see [developing schematics](#Developing-schematics)

## Developing schematics

### Glossary

Here are some terms you might hear or find in the code:

- installing a feature vs. configuring a features: by _installing_ a feature, we mean specifying a spartacus library in the customers' package.json, and running `yarn` or `npm install` which will download the library into the `node_modules`. By _configuring_ a feature, we mean generating its feature module (e.g. `checkout-feature.module.ts`) where are all features' configuration lives.

- Spartacus library vs. Spartacus feature - a library is a top-level Spartacus library (e.g. `@spartacus/checkout`). A feature is contained withing that library, and it could have its own secondary entry-point (e.g. `@spartacus/checkout/base`). Feature usually have their own menu item in the schematics prompt.

- "wrapper" modules - refers to our feature extension mechanism, as described [here](https://wiki.one.int.sap/wiki/x/bwAfsw) and mentioned [in schematics ADR](https://wiki.one.int.sap/wiki/x/PJhbsQ).

### Preparing setup

- Install verdaccio `$ npm i -g verdaccio@4` (only for the first time)
- Run it: `$ verdaccio`
- Create an npm user: `$ npm adduser --registry http://localhost:4873`. After completing the registration of a new user, stop the verdaccio. This setup is only required to do once.
- Create new angular project `ng new schematics-test --style scss`
- Run verdaccio script `ts-node ./tools/schematics/testing.ts` (or `./node_modules/ts-node/dist/bin.js ./tools/schematics/testing.ts` in case you don't have _ts-node_ installed globally).

### Publishing to verdaccio

- before you publish for the first time make sure you have builded libs or run `build all libs`
- select option `publish` from the verdaccio script (it will bump package patch version and publish to verdaccio)
- do changes, rebuild changed libraries and publish once again (every publish will bump to even higher version)

### Workflow for testing schematics

- run schematics you want to test (to revert schematics changes `git reset --hard HEAD && rm -rf node_modules/@spartacus && <your-schematics-command>`)
- try until everything is perfect

### Workflow for testing migrations

- add Spartacus by running e.g. `ng add @spartacus/schematics@<version> --base-url https://spartacus-demo.eastus.cloudapp.azure.com:8443/ --base-site electronics-spa`. Note the `<version>` after `ng add @spartacus/schematics`. This should be lower than the one you're going to publish. E.g. if developing schematics for Spartacus 3.0, then you should install Spartacus 2.0.
- commit the changes, if any.
- run schematics you want to test (to revert schematics changes `git reset --hard HEAD && rm -rf node_modules && npm i`)
- try until everything is perfect

### Creating and configuring feature schematics

One of the common tasks a library author has to do is to create schematics for the library they are developing.

To start creating the schematics configuration, a developer has to first create a configuration file in  the `projects/schematics/src/shared/lib-configs/*` directory.

The objects has to conform to the `SchematicsConfig` interface:

- `library.featureName` - corresponds to the CLI's feature name defined in `projects/schematics/src/add-spartacus/schema.json`'s `features.items.enum` array.
- `library.mainScope` - represents the Spartacus library's main scope, e.g. `@spartacus/checkout`.
- `library.featureScope` - if the library has multiple features organized in secondary entry-points, the entry pont's name should be defined here - e.g. `@spartacus/checkout/base/b2b`.
- `library.b2b` - if the feature is a b2b feature, it will provide the b2b configuration. 
- `folderName` - the name of the folder where the feature will be created.
- `moduleName` - the name of the generated feature module.
- `featureModule` - the feature module's configuration, e.g. `CheckoutB2BModule` from `@spartacus/checkout/b2b`.
- `rootModule` - the root module's configuration, e.g. `CheckoutB2BRootModule` from `@spartacus/checkout/b2b/root`. Omit if your feature doesn't have a root module (e.g. `DigitalPayments` doesn't have it).
- `lazyLoadingChunk` - if the feature is being installed in a LL manner, this config will be used to provide the LL configuration.
- `i18n` - configuration for the translations.
- `styles` - configuration for the styles.
- `assets` - configuration for the assets - e.g. Smartedit has to provide some configuration to the angular.json's assets.
- `customConfig` - generates some non-standard configuration providers in the feature module.
- `dependencyFeatures` - should configure the runtime features on which your library depends on. This prevents Spartacus to install e.g. `Checkout` feature without configuring its dependency feature module - `Order`. In this case, `Checkout` depends on the `User` features as well, which _don't have to be specified_, as they're the transitive dependencies of the already specified `Order` feature.
- `importAfter` - related to wrapper modules, and specifies after which module (aka "marker" module) should the given module be imported. E.g. the `CheckoutB2BModule` should be imported after the base checkout's `CheckoutModule`.

The finished configuration file needs to imported to `projects/schematics/src/shared/schematics-config-mappings.ts`' `SCHEMATICS_CONFIGS` array. `SCHEMATICS_CONFIGS`' order follows the order in which features are sorted in the file explorer's tree.


## Update schematics

### Introduction

When upgrading Spartacus to a new major version (for example, from 3.x to 4.0), the Spartacus migration mechanism automatically implements fixes for code that is modified or removed in the new version.

When you are working on a feature or a bug, or making any other change to the Spartacus source code, you need to update the schematics as part of the [Definition Of Done](https://sap.github.io/spartacus-docs/definition-of-done/). By making these updates iteratively as part of the DoD for each change to the source code, it saves you from having to spend a lot of time upgrading the migration mechanism at the end of the development cycle, and as a result, it makes it easier to prepare the Spartacus libraries for a new major version.

### Migration Mechanism

After upgrading to a new major version, the migration mechanism should be updated at the very beginning of the new development cycle. For example, if Spartacus has been updated from version 2.x to 3.0, the updated mechanism should be merged to the `develop` branch as soon as possible. This allows contributors to include migrations with their features and bug fixes from the very start of the development cycle.

### Structure for Updating Schematics

The `projects/schematics/src/migrations/migrations.json` file contains a list of all the migration scripts for every Spartacus version. The following is an example of a migration script:

```json
"03-migration-v3-constructor-deprecations": {
      "version": "3.0.0",
      "factory": "./3_0/constructor-deprecations/constructor-deprecations#migrate",
      "description": "Add or remove constructor parameters"
    },
```

Each script has a set of properties, which are described as follows:

- `name` allows developers to quickly understand what the migration script is doing. The migration `name` has the following pattern: `<sequence-number>-migration-v<version>-<migration-feature-name>`. The elements of `name` are as follows:
  - `sequence-number` indicates the order of execution for the migration scripts. For example, if a script has a `sequence-number` of `03`, it will be the third script to execute when the migration scripts are run.
  - `version` indicates which version of Spartacus the migration is intended for.
  - `migration-feature-name` is a short name that describes what the migration is doing.
- `version` is very important for the Angular update mechanism. It is used to automatically run the required migration scripts for a specific version. For more information, see the [releasing update schematics](#releasing-update-schematics) section of the schematics README.
- `factory` points to the relevant migration script.
- `description` is a short, free-form description field to describe what the migration script does.

### Validations

If any validations need to be run before actually upgrading Spartacus, you can use the "migration script" located in `projects/schematics/src/migrations/3_0/validate.ts`.

### Constructor deprecation

The `projects/schematics/src/migrations/3_0/constructor-deprecations.ts` performs the constructor migration tasks. Usually, a developer does not need to touch this file, and instead should describe constructor deprecations in `projects/schematics/src/migrations/3_0/constructor-deprecation-data.ts`. The `CONSTRUCTOR_DEPRECATION_DATA` constant describes the deprecated constructor, and includes the `addParams` and `removeParams` properties that allow you to specify which parameters should be added or removed, respectively.

### Commenting code

When it is not possible to automatically migrate code, we often place a comment in the customer's code base that describes what the customer should do to upgrade their project to the new version of Spartacus. We should do this only in cases where upgrading manually is easy, and writing a migration script would be too complex.

The `projects/schematics/src/shared/utils/file-utils.ts#insertCommentAboveIdentifier` method adds comments above the specified `identifier` TypeScript node.

The following are examples of how you might add a comment:

- If you removed an API method, you could add a comment above the removed method that suggests which method can be used instead.
- If you changed the parameters of an NgRx action, you could add a comment above the action where the parameters were changed.

### Component deprecation

Similar to constructor deprecation, `projects/schematics/src/migrations/3_0/component-deprecations.ts` performs component migration tasks, for both component `*.ts` and `HTML` templates. Usually, a developer does not need to touch this file, and instead should describe component deprecations in `projects/schematics/src/migrations/3_0/component-deprecations-data.ts`. The `COMPONENT_DEPRECATION_DATA` constant describes the deprecated components.

### CSS

To handle CSS changes, we print a link to the CSS migration documentation, where customers can look up which CSS selectors have changed in the new version of Spartacus. If you are making a change to a CSS selector, simply update the relevant documentation (such as, [Changes to Styles in 3.0](https://sap.github.io/spartacus-docs/css-changes-in-version-3/)).

### Adding a Migration

The following is an example flow for adding a migration:

- Check whether any of the changed files are exported in the public API. If no, then no further action is required.
- Check whether any of the changes you have made are breaking changes. If not, no further action is required. For more information, see [Maintaining Public APIs](https://sap.github.io/spartacus-docs/breaking-changes/).
- For every breaking change, you must do the following:
  - Document the breaking change by updating the corresponding migration doc file (such as `docs/migration/3_0.md`), and if necessary, ensure that code comments have been added.
  - Build automation tasks, as described in the [Validations](#validations), [Constructor Deprecation](#constructor-deprecation), and [Component Deprecation](#component-deprecation)) sections, above.
  - [Test the added migrations](#testing-schematics) by running tests, [trying to migrate an example app](#Developing-schematics), and so on.

You can see an example of adding a migration in [this pull request](https://github.com/SAP/spartacus/pull/9946/files).

## Releasing update schematics

This section is for developers who do the release, and it specifies how to manage the versions in `projects/schematics/src/migrations/migrations.json`.

The migration scripts that are listed here should be executed each time customers perform the automatic upgrade by running `ng update @spartacus/schematics --next`:

- `**-migration-v*-validate`
- `**-migration-v*-rename-symbol`
- `**-migration-v*-methods-and-properties-deprecations`
- `**-migration-v*-constructor-deprecations`
- `**-migration-v*-removed-public-api-deprecation`
- `**-migration-v*-component-deprecations`
- `**-migration-v*-css`
- `**-migration-v*-config-deprecations`
- `**-migration-v*-dependency-management`
- `**-migration-v*-missing-packages`

The `v*` refers _only_ to the _latest major_ Spartacus version (v3 as of this moment).

Please bump the `version` in `migrations.json` only for the migration scripts listed above, and _do not change the other script's versions_.
This means that the scripts for the older major Spartacus versions should _also **not** be updated_.

This is _really_ important for the Angular's update mechanism, as it is used to automatically execute the required migration scripts for the current project's version.
It's also important to note that after we release a Spartacus _next.x_, or an _rc.x_ version, all the migration scripts that are written after the release _have_ to specify the future release version.
E.g. if Spartacus _2.0.0-next.1_ has been released, then the _new_ migration scripts (added after it _2.0.0-next.1_) should specify the next version (e.g. _2.0.0-next.2_).
This is required for clients that upgrade frequently and it will make angular to run only the new migration scripts for them, avoiding the same scripts to run twice.
However, there are exceptions from this rule - as we have data-driven generic mechanisms for e.g. constructor deprecation, we have to bump the version in `migrations.json` for those scripts.

Update the migration script `version` only for new major releases, such as 6.0.0. This means that if you are performing a release like 6.3.2, the version should remain unchanged.
Example for 6.3.2 release:
```   
 "09-migration-v6-angular-json-styling": {
      "version": "6.0.0",
      "factory": "./6_0/angular-json-styles/angular-json-styles#migrate",
      "description": "Update the angular.json with the style preprocessor options"
    }
```
version remains unchanged

## FeatureToggles copying
The installation schematics generates a list of available feature toggles in a customer's app.
It's to help customers to see what feature toggles are available in Spartacus.

Moreover, each feature toggle is explicitly enabled in customer's app, to help customers start with the most up-to-date configuration (without a technical debt of any feature toggles disabled). Of course, they can disable any feature toggle they don't want to use.

**Technical notes:**
During running the `build` and `test` commands in the schematics project,
the file `feature-toggles.ts` is copied temporarily from the `@spartacus/core` project location
to the file `src/feature-toggles.copied-from-core-lib.ts` file in the `@spartacus/schematics` project location. The file is git-ignored.

In particular, this TS file is copied to schematics project. Then the  `build` command compiles it into a JS file. Then the JS file will be shipped with all other JS files in the schematics project to customers, and it will be used in runtime of schematics to generate a list of feature toggles in customer's app.

Note: We copy the TS file to the schematics project location (instead of directly importing it from the core project) to avoid a direct dependency in `@spartacus/schematics` on the lib `@spartacus/core`.