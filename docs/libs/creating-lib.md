# Creating a Spartacus library

An easy way to create a new Spartacus library is to run: `nx g @schematics/angular:library <lib-name> --prefix=cx` where the `lib-name` is the name of the new library.

The library will be generated in the `root of the project` folder by default. You need to manually move the generated folder, which is under the `<lib-name>` you entered to the appropriate directory (if necessary). The entire generated folder should be moved either under `feature-libs` or `integration-libs`.

This document can also serve as the guideline for the future schematic that can automate this process.

## Table of contents

- [Creating a Spartacus library](#creating-a-spartacus-library)
  - [Table of contents](#table-of-contents)
  - [Naming conventions](#naming-conventions)
  - [Generating a library](#generating-a-library)
  - [Aligning with the other libs](#aligning-with-the-other-libs)
    - [Modifying the generated files](#modifying-the-generated-files)
    - [Additional changes to existing files](#additional-changes-to-existing-files)
    - [Sample data release entry ONLY if applicable](#sample-data-release-entry-only-if-applicable)
  - [Multi-entry point library](#multi-entry-point-library)
    - [Process](#process)
  - [Testing](#testing)
  - [Schematics](#schematics)
    - [Configuring Schematics](#configuring-schematics)
    - [Testing Schematics](#testing-schematics)
  - [Installation script](#installation-script)

## Naming conventions

These are some naming guidelines for libraries:

- library names should be abbreviated, if possible (e.g. _cds_)
- library names should use kebab-case (e.g. `my-account`)
- the scripts added to `package.json` should _not_ use kebab-case (e.g. `npm run build:myaccount`)

## Generating a library

Run `nx g @schematics/angular:library <lib-name> --prefix=cx`, move it to the appropriate directory (`feature-libs` or `integration-libs`), and commit.

## Aligning with the other libs

In order to be 100% aligned with the existing Spartacus library there are some generated files that should be updated and there are some files that need to be additionally created. Make sure that the `src` folder would not exist in the newly generated library.

If you are generating a library, which purpose is to be a `single-entry point library`, then you can follow the file structure as done in `feature-libs/customer-ticketing`
If you are generating a library, which purpose is to be a `multi-entry point library`, then you can follow the file structure as done in `feature-libs/checkout`

### Modifying the generated files

The list of the files that need to modified:

- `README.md` - replace the default content with some relevant information about the library.

- `karma.conf.js`

Just copy paste the following and and make sure to rename `TODO:` to you lib's name:

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
    ],
    client: {
      clearContext: true, // close Jasmine Spec Runner output in browser to avoid 'Some of your tests did a full page reload!' error when '--no-watch' is active
    },
    reporters: ['progress', 'kjhtml', 'dots', 'junit'],
    junitReporter: {
      outputFile: 'unit-test-<lib-name>.xml',
      outputDir: require('path').join(__dirname, '../../unit-tests-reports'),
      useBrowserName: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/TODO'),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 90,
          lines: 90,
          branches: 75,
          functions: 85,
        },
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
```

- `project.json`

  - add the lint `targets > lint`

    replace the TODO: with the library name. Please remember it can either be a feature-libs or integration-libs.

    ```json
    "lint": {
      "executor": "@angular-eslint/builder:lint",
      "options": {
        "lintFilePatterns": [
          "integration-libs/TODO:/**/*.ts",
          "integration-libs/TODO:/**/*.html"
        ]
      }
    }
    ```
  - add the test-jest `targets > test-jest`

    replace the TODO: with the library name. Please remember it can either be a feature-libs or integration-libs.

    ```json
    "test-jest": {
      "executor": "nx:run-commands",,
      "options": {
        "command": "npm run test:schematics",
        "cwd": "feature-libs/TODO:
      }
    }
    ```

  - add the tag(s)
    - type:feature
    - type:integration `IF AND ONLY IF` it is an integration lib.

    ```json
    {
      "name": "some-library-name",
      "$schema": "../../node_modules/nx/schemas/project-schema.json",
      "projectType": "library",
      "sourceRoot": "feature-libs/some-library-name",
      "prefix": "cx",
      "targets": {
        ...
        ...
        ...
        "lint": {
          "executor": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "integration-libs/some-library-name/**/*.ts",
              "integration-libs/some-library-name/**/*.html"
            ]
          }
        }
        ...
        ...
        ...
      },
      "tags": ["type:feature"]
    }
    ```

- `public-api.ts`

  - rename this file to `public_api.ts` (with the underscore instead of the dash)
  - move `public_api.ts` from `./src/lib/public_api.ts` to `./public_api.ts`.
  - change the path in `ng-package.json`'s `entryFile` property to `./public_api.ts`

- `ng-package.json`

Add `assets` section so your file looks like this:
(adapt assets path to what makes sense for your lib)

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/{LIB_NAME}",
  "lib": {
    "entryFile": "./public_api.ts"
  },
  "assets": ["**/*.scss", "schematics/**/*.json", "schematics/**/*.js"]
}
```

If necessary, add entries for other libraries such as `"@ngrx/store": "store"`, etc.

- `package.json`

Use the following template:

```json
{
  "name": "@spartacus/TODO:",
  "version": "3.0.0-next.0",
  "description": "TODO:",
  "homepage": "https://github.com/SAP/spartacus",
  "keywords": ["spartacus", "framework", "storefront", "TODO:"],
  "license": "Apache-2.0",
  "exports": {
    ".": {
      "sass": "./_index.scss"
    }
  },
  "publishConfig": {
    "access": "public"
  },
  "repository": "https://github.com/SAP/spartacus/tree/develop/feature-libs/TODO",
  "dependencies": {
    "tslib": "^2.0.0"
  },
  "peerDependencies": {
    "@angular/common": "^10.1.0",
    "@angular/core": "^10.1.0",
    "rxjs": "^7.8.0",
    "@spartacus/core": "3.0.0-next.0",
    "@spartacus/storefront": "3.0.0-next.0"
  }
}
```

Make sure to replace `TODO:`s with the relevant information.
Adjust the `@spartacus/core` and/or `@spartacus/storefront` depending on the need.
Make sure the versions match the current spartacus version.
Make sure the `@angular` peer dependencies matches the versions specified in the _core_ lib.
If your library doesn't expose any SCSS styles, remove the section `exports`/`sass`.

- `test.ts`

  - in order to run the tests for _all_ the entry points, you can to create the `test.ts` file in `lib-name/test.ts`.

  This change requires an update in:

  1. `project.json` - change the `targets -> test -> options -> main` value to reflect the new file path
    Just copy paste the following and and make sure to rename `TODO:` to you lib's name:

    ```json
      "test": {
        "executor": "@angular-devkit/build-angular:karma",
        "options": {
          "main": "feature-libs/TODO:/test.ts",
          "tsConfig": "feature-libs/TODO:/tsconfig.spec.json",
          "polyfills": ["zone.js", "zone.js/testing"],
          "karmaConfig": "feature-libs/TODO:/karma.conf.js"
        }
      },
    ```

  2. `feature-libs/<lib-name>/tsconfig.lib.json` - update the path in `exclude`
  3. `feature-libs/<lib-name>/tsconfig.spec.json` - update the path in `files`

- `tsconfig.lib.json`

Use the following template:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "forceConsistentCasingInFileNames": true,
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "strict": true,
    "sourceMap": true,
    "inlineSources": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "types": [],
    "lib": ["dom", "esnext"],
    "paths": {
      "@spartacus/core": ["dist/core"],
      "@spartacus/storefront": ["dist/storefrontlib"]
    }
  },
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": true,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "enableResourceInlining": true,
    "strictTemplates": true,
    "strictInputAccessModifiers": true
  },
  "exclude": ["test.ts", "**/*.spec.ts"]
}
```

- `tsconfig.spec.json` - add `"target": "es2022", "module": "es2022"` in `"compilerOptions"`:

```json
{
  /* ... */
  "compilerOptions": {
    /* ... */
    "target": "es2022",
    "module": "es2022"
  }
}
```

- run `npm run config:update` script to update `compilerOptions.path` property in tsconfig files
- `tsconfig.lib.prod.json` - save to re-format it. Make sure that Ivy is off (for the time being, this will change in the future)
- `tslint.json` - remove
- the rest of the generated files should be removed

- `package.json` of your library - if your library exports any `scss` styles, add the following `exports` section to your `package.json`:
  ```json
    "exports": {
      ".": {
        "sass": "./_index.scss"
      }
    },
  ```
  and then run `npm run config:update` (to fix the formatting)

### Additional changes to existing files

> Before starting this section it is recommended to commit the previous changes

The following files should be modified:

- `projects/storefrontapp/src/environments/models/environment.model.ts` - if creating a feature that can be toggled on/off, add your feature to this model class
- `projects/storefrontapp/src/environments/models/build.process.env.d.ts` - if creating a feature that can be toggled on/off, add your feature environment variable to the `Env` interface located in this file
- `projects/storefrontapp/src/environments/environment.ts` - if creating a feature that can be toggled on/off, set you feature for development as enabled or disabled by default
- `projects/storefrontapp/src/environments/environment.prod.ts` - if creating a feature that can be toggled on/off, pass the created env. variable to your feature

- Root `package.json`

Add the following scripts:

```json
"build:asm": "npm --prefix feature-libs/asm run build:schematics && npx nx build asm --configuration production"
```

And replace `asm` instances with the name of yours lib.

Also, add the new lib to the `build:libs` and `test:libs` scripts.

- `projects/schematics/package.json` - add the library to the package group

- `ci-scripts/unit-tests.sh`


### Sample data release entry ONLY if applicable

If you have your own sample data that derives from our spartacussampledata, such as epdvisualizationspartacussampledata, then the following is applicable to you.

1. `publish-sample-data.yml` - add an input entry and env entry to pass the input to the publish-sample-data script. This input is the target branch that we would want to release.
2. `publish-sample-data.sh`:
   1. create a variable at the top to use $STOREFRONT_FILE_NAME as a prefix, which is used to name the zip/tar.
   2. create one function that utilize downloading the assets (zip/tar) of your sample data like the `download_sample_data` function.
   3. add a note for the `gh release` that mentions what that zip is. For example, if the zip is called spartacussampledata-TODO.zip, then make sure it mentions what that TODO is.

## Multi-entry point library

Sources:

- [ng-packagr examples](https://github.com/ng-packagr/ng-packagr/tree/master/integration/samples/secondary)

### Process

If adding multiple entry points to the generated library, make sure to do the following changes:

- `project.json` - make sure `sourceRoot` does not contain `src`, and just the library name

- make sure to follow the general folder structure, as seen in e.g. `feature-libs/product` library
- add `ng-package.json` to each of the feature folders
- run `npm run config:update` script to update `compilerOptions.path` property in tsconfig files

## Testing

Don't forget to:

- run the tests for the generated library - `npx nx test <lib-name> --code-coverage`. In case of a library with multiple entry points, make sure to check the code-coverage report generated in the `coverage/my-account/lcov-report/index.html`
- build the generated library _with Ivy enabled_ - `npx nx build <lib-name>`
- build the generated library (without Ivy) - `npx nx build <lib-name> --configuration production`
- build the production-ready shell app with the included generated library (import a dummy service from the generated service):
  - `npm run build:libs` (build all the libs)
  - `npm run build`

## Schematics

To finalize feature-lib it requires schematics

### Configuring Schematics

There are couple of required changes to make sure schematics will work properly

- add new feature lib to schematics schemas - `projects\schematics\src\add-spartacus\schema.json` (use kebab-case (e.g. `Quick-Order`))
- add new feature lib module to `SpartacusFeaturesModule` - `projects\storefrontapp\src\app\spartacus\spartacus-features.module.ts`
- add new feature lib paths to tsconfig
  - `tsconfig.json`,
  - `tsconfig.compodoc.json`,
  - `projects/storefrontapp/tsconfig.server.prod.json`,
  - `projects/storefrontapp/tsconfig.server.json`,
  - `projects/storefrontapp/tsconfig.app.prod.json`
- add new feature lib schema.json elements in schematics folder - `feature-libs\<lib-name>\schematics\add-<lib-name>\schema.json` where the `lib-name` is the name of the new library
- add new feature chain method to 'shouldAddFeature' and function to add it - `feature-libs\<lib-name>\schematics\add-<lib-name>\index.ts` where the `lib-name` is the name of the new library
- create new feature lib module in - `projects/storefrontapp/src/app/spartacus/features`
- create your schematics configuration in e.g. `projects/schematics/src/shared/lib-configs/asm-schematics-config.ts` and add it to the `projects/schematics/src/shared/schematics-config-mappings.ts` file.

### Testing Schematics

IMPORTANT : DO NOT PUSH any changed done under this step.

- Install verdaccio locally `$ npm i -g verdaccio@latest` (only for the first time)
- Run it: `$ verdaccio`
- Create an npm user: `$ npm adduser --registry http://localhost:4873`. After completing the registration of a new user, stop the verdaccio. This setup is only required to do once
- Create new angular project `ng new schematics-test --style scss --routing=false`
- Run verdaccio script `ts-node ./tools/schematics/testing.ts` (or `./node_modules/ts-node/dist/bin.js ./tools/schematics/testing.ts` in case you don't have _ts-node_ installed globally) in main spartacus core folder
- Build all libs (if it is first time, if not just build your new lib) or run a command `npm run build:libs`
- Publish
- Add spartacus to new angular project `ng add @spartacus/schematics@latest --base-url https://spartacus-demo.eastus.cloudapp.azure.com:8443/ --base-site=electronics-spa

## Installation script

[Installation Script for Spartacus](https://github.com/SAP/spartacus/blob/develop/scripts/install/README.md)

If your library is an integration library (that requires a separate integration servers), a separate toggle flag should be implemented in the Installation Script.

In the following examples please replace `TODO` and `todo` with your appropriate library name:

- In `scripts/install/config.default.ts` add a new flag `ADD_TODO=false` (similar to `ADD_CDC=false`)

In `scripts/install/functions.ts`:

- add a switch-case inside the `function parseInstallArgs` (similar to the case `cdc)`):

  ```bash
  function parseInstallArgs {
    ...

    todo)
        ADD_TODO=true
        echo "➖ Added TODO"
        shift
        ;;
  ```

- create a new function `add_todo` for installing your library (similar to `function add_cdc`):

  ```bash
  function add_todo {
    if [ "$ADD_TODO" = true ] ; then
          ng add @spartacus/todo@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
      fi
  }
  ```

- invoke your installation function `add_todo` in 3 other functions (similar to `add_cdc`):
  - CSR installation:
    ```bash
    function install_spartacus_csr {
        ...
        add_todo
    }
    ```
  - SSR installation:
    ```bash
    function install_spartacus_ssr {
        ...
        add_todo
    }
    ```
  - SSR PWA installation:
    ```bash
    function add_spartacus_ssr_pwa {
        ...
        add_todo
    }
    ```
