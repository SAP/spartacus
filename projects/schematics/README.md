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
2. Run `$ yarn test:schematics`. _NOTE_ that when testing `projects/schematics`, the command which to run is `$ yarn test`.

The schematics already have unit tests to cover the migration tasks they were designed to perform. However, you might want to test if the new schematics configuration you added will produce the expected result when a user will perform a migration with the help of the schematics without running a full migration on an app, which would be very time consuming. A convenient way to test your new config is to temporarily modify a schematics unit test case and use an example that will use your new config instead. After you assess your migration scenario plays out as expected, you can revert the changes you did in the unit test.

The following points provide guidance on how to achieve that.

- let's say you're working on a constructor deprecation task, in which case you would open the `projects/schematics/src/migrations/mechanism/constructor-deprecations/constructor-deprecations_spec.ts`.
- first thing to change is the `MIGRATION_SCRIPT_NAME`. If you're testing a migration task for v3, you would change the value of the `MIGRATION_SCRIPT_NAME` constant to `migration-v3-constructor-deprecations-03` (notice the **v3** in the name). To see the exact name of the migration script, you can go to `projects/schematics/src/migrations/migrations.json` and copy-paste the script's name you're testing to the spec file.
- next, you can pick and choose a test that's using a class as an input (where the class is a made up testing class from customers' perspective, represented as a string). The output of the test is also a class, modified by the schematics (basically the expected result); again, this class is also represented as a string. Therefore, in case of the constructor deprecation, you can modify e.g. `ADD_AND_REMOVE_PARAMETER_VALID_TEST_CLASS` constant to match your made up input. You can then just `console.log()` the result and assert the migrated code manually in the console.
- in order to save yourself some time, it's recommended to `fdescribe` (or `fit`) the test that's using the constants from the previous step. To run the test(s), follow the steps from the beginning of this section. An additional benefit is that it removes a lot of noise in the terminal, which is especially useful when using `console.log()`ing the result.

### Integration testing

The best way to test an unpublished schematic is to publish it to a local npm registry. For more, see [developing schematics](#Developing-schematics)

## Developing schematics

### Preparing setup

- Install verdaccio `npm i -g verdaccio@4` (only for the first time)
- Create new angular project `ng new schematics-test --style=scss`
- Run verdaccio script `ts-node ./tools/schematics/testing.ts` (or `./node_modules/ts-node/dist/bin.js ./tools/schematics/testing.ts` in case you don't have _ts-node_ installed globally).

### Publishing to verdaccio

- before you publish for the first time make sure you have builded libs or run `build all libs`
- select option `publish` from the verdaccio script (it will bump package patch version and publish to verdaccio)
- do changes, rebuild changed libraries and publish once again (every publish will bump to even higher version)

### Workflow for testing schematics

- run schematics you want to test (to revert schematics changes `git reset --hard HEAD && rm -rf node_modules && npm i`)
- try until everything is perfect

### Workflow for testing migrations

- add Spartacus by running e.g. `ng add @spartacus/schematics@<version> --baseUrl https://spartacus-demo.eastus.cloudapp.azure.com:8443/ --baseSite electronics-spa`. Note the `<version>` after `ng add @spartacus/schematics`. This should be lower than the one you're going to publish. E.g. if developing schematics for Spartacus 3.0, then you should install Spartacus 2.0.
- commit the changes, if any.
- run schematics you want to test (to revert schematics changes `git reset --hard HEAD && rm -rf node_modules && npm i`)
- try until everything is perfect

## Update schematics

### Introduction

When upgrading Spartacus to a new major version (for example, from 3.x to 4.0), the Spartacus migration mechanism automatically implements fixes for code that is modified or removed in the new version.

When you are working on a feature or a bug, or making any other change to the Spartacus source code, you need to update the schematics as part of the [Definition Of Done](https://sap.github.io/spartacus-docs/definition-of-done/). By making these updates iteratively as part of the DoD for each change to the source code, it saves you from having to spend a lot of time upgrading the migration mechanism at the end of the development cycle, and as a result, it makes it easier to prepare the Spartacus libraries for a new major version.

### Migration Mechanism

After upgrading to a new major version, the migration mechanism should be updated at the very beginning of the new development cycle. For example, if Spartacus has been updated from version 2.x to 3.0, the updated mechanism should be merged to the `develop` branch as soon as possible. This allows contributors to include migrations with their features and bug fixes from the very start of the development cycle.

### Structure for Updating Schematics

The `projects/schematics/src/migrations/migrations.json` file contains a list of all the migration scripts for every Spartacus version. The following is an example of a migration script:

```json
"migration-v3-constructor-deprecations-03": {
      "version": "3.0.0",
      "factory": "./3_0/constructor-deprecations/constructor-deprecations#migrate",
      "description": "Add or remove constructor parameters"
    },
```

Each script has a set of properties, which are described as follows:

- `name` allows developers to quickly understand what the migration script is doing. The migration `name` has the following pattern: `migration-v<version>-<migration-feature-name>-<sequence-number>`. The elements of `name` are as follows:
  - `version` indicates which version of Spartacus the migration is intended for.
  - `migration-feature-name` is a short name that describes what the migration is doing.
  - `sequence-number` indicates the order of execution for the migration scripts. For example, if a script has a `sequence-number` of `03`, it will be the third script to execute when the migration scripts are run.
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

- `migration-v*-validate-01`
- `migration-v*-methods-and-properties-deprecations-02`
- `migration-v*-constructor-deprecations-03`
- `migration-v*-removed-public-api-deprecation-04`
- `migration-v*-component-deprecations-05`
- `migration-v*-css-06`
- `migration-v*-config-deprecations-09`
- `migration-v*-dependency-management-03`

The `v*` refers _only_ to the _latest major_ Spartacus version (v3 as of this moment).

Please bump the `version` in `migrations.json` only for the migration scripts listed above, and _do not change the other script's versions_.
This means that the scripts for the older major Spartacus versions should _also **not** be updated_.

This is _really_ important for the Angular's update mechanism, as it is used to automatically execute the required migration scripts for the current project's version.
It's also important to note that after we release a Spartacus _next.x_, or an _rc.x_ version, all the migration scripts that are written after the release _have_ to specify the future release version.
E.g. if Spartacus _2.0.0-next.1_ has been released, then the _new_ migration scripts (added after it _2.0.0-next.1_) should specify the next version (e.g. _2.0.0-next.2_).
This is required for clients that upgrade frequently and it will make angular to run only the new migration scripts for them, avoiding the same scripts to run twice.
However, there are exceptions from this rule - as we have data-driven generic mechanisms for e.g. constructor deprecation, we have to bump the version in `migrations.json` for those scripts.
