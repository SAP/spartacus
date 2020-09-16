# Creating a Spartacus library

An easy way to create a new Spartacus library is to run: `ng g library <lib-name>` where the `lib-name` is the name of the new library.

The library will be generated in the `feature-libs` folder by default. You need to manually move the generated files to an appropriate directory (if necessary) and modify `angular.json` to reflect the new location.

This document can also serve as the guideline for the future schematic that can automate this process.

## Table of contents

- [Naming conventions](#Naming-conventions)
- [Generating a library](#Generating-a-library)
- [Aligning with the other libs](#Aligning-with-the-other-libs)
  - [Modifying the generated files](#Modifying-the-generated-files)
  - [Additional changes to existing files](#Additional-changes-to-existing-files)
- [Multi-entry point library](#multi-entry-point-library)
- [Testing](#Testing)

## Naming conventions

These are some naming guidelines for libraries:

- library names should be abbreviated, if possible (e.g. _cds_)
- library names should use kebab-case (e.g. `my-account`)
- the scripts added to `package.json` should _not_ use kebab-case (e.g. `yarn build:myaccount`)

## Generating a library

Run `ng g library <lib-name>` and commit.

## Aligning with the other libs

In order to be 100% aligned with the existing Spartacus library there are some generated files that should be updated and there are some files that need to be additionally created

### Modifying the generated files

The list of the files that need to modified:

- `README.md` - replace the default content with some relevant information about the library.

- `angular.json` - change the `prefix` property to `cx`.

- `karma.conf.js`

Just copy paste the following:

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
      require('karma-junit-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'dots'],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/TODO:'),
      reports: ['lcov', 'cobertura', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 70,
        functions: 80,
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

Make sure to rename `TODO:` to you lib's name.

- `ng-package.json`

Add the following under `lib` section:

```json
    "umdModuleIds": {
      "@spartacus/core": "core",
      "@spartacus/storefront": "storefront",
      "rxjs": "rxjs"
    }
```

If necessary, add entries for other libraries such as `"@ngrx/store": "store"`, etc.

- `public-api.ts` - rename this file to `public_api.ts` (with the underscore instead of the dash) and change the path in `ng-package.json`'s `entryFile` property to `./public_api.ts`

- `package.json`

Use the following template:

```json
{
  "name": "@spartacus/TODO:",
  "version": "3.0.0-next.0",
  "description": "TODO:",
  "homepage": "https://github.com/SAP/spartacus",
  "keywords": [
    "spartacus",
    "framework",
    "storefront",
    "TODO:"
  ],
  "license": "Apache-2.0",
  "publishConfig": {
    "access": "public"
  },
  "repository": "https://github.com/SAP/spartacus",
  "peerDependencies": {
    "@angular/common": "^9.0.0",
    "@angular/core": "^9.0.0",
    "rxjs": "^6.5.4",
    "@spartacus/core": "3.0.0-next.0",
    "@spartacus/storefront": "3.0.0-next.0"
  }
}
```

Make sure to replace `TODO:`s with the relevant information.
Adjust the `@spartacus/core` and/or `@spartacus/storefront` depending on the need.
Make sure the versions match the current spartacus version.
Make sure the `@angular` peer dependencies matches the versions specified in the _core_ lib.

- `test.ts` - add `import '@angular/localize/init';`

- `tsconfig.lib.json`

Use the following template:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "target": "es2015",
    "module": "es2015",
    "moduleResolution": "node",
    "declaration": true,
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
    "enableResourceInlining": true
  },
  "exclude": ["src/test.ts", "**/*.spec.ts"]
}
```

Optionally adjust the `path` property.

- `tsconfig.lib.prod.json` - save to re-format it. Make sure that Ivy is off (for the time being, this will change in the future)
- `tsconfig.spec.json` - save to re-format
- `tslint.json` - change from `lib` to `cx` in the `directive-selector` and `component-selector`
- the rest of the generated file should be removed

### Additional changes to existing files

> Before starting this section it is recommended to commit the previous changes

The following files should be modified:

- `projects/storefrontapp/src/environments/models/environment.model.ts` - if creating a feature that can toggled on/off, add your feature to this model class
- `projects/storefrontapp/src/environments/models/build.process.env.d.ts` - if creating a feature that can toggled on/off, add your feature environment variable to the `Env` interface located in this file
- `projects/storefrontapp/src/environments/environment.ts` - if creating a feature that can toggled on/off, set you feature for development as enabled or disabled by default
- `projects/storefrontapp/src/environments/environment.prod.ts` - if creating a feature that can toggled on/off, pass the created env. variable to your feature

- Root `package.json`

Add the following scripts:

```json
"build:myaccount": "ng build my-account --prod",
"release:myaccount:with-changelog": "cd feature-libs/my-account && release-it && cd ../.."
```

And replace `myaccount` and `my-account` instances with the name of yours lib.

Optionally, add the generated lib to the `build:core:lib` and `test:core:lib` scripts.

- `.release-it.json`

```json
{
  "git": {
    "requireCleanWorkingDir": true,
    "requireUpstream": false,
    "tagName": "TODO:-${version}",
    "commitMessage": "Bumping TODO: version to ${version}",
    "tagAnnotation": "Bumping TODO: version to ${version}"
  },
  "npm": {
    "publishPath": "./../../dist/TODO:"
  },
  "hooks": {
    "after:version:bump": "cd ../.. && ng build TODO: --prod"
  },
  "github": {
    "release": true,
    "assets": ["../../docs.tar.gz", "../../docs.zip"],
    "releaseName": "@spartacus/TODO:@${version}",
    "releaseNotes": "ts-node ../../scripts/changelog.ts --verbose --lib TODO: --to TODO:-${version}"
  },
  "plugins": {
    "../../scripts/release-it/bumper.js": {
      "out": [
        {
          "file": "package.json",
          "path": [
            "peerDependencies.@spartacus/core",
            "peerDependencies.@spartacus/storefront"
          ]
        }
      ]
    }
  }
}
```

Replace `TODO:` with the appropriate name.

- `projects/storefrontapp/tsconfig.app.prod.json`

Add the following to the `paths` (and replace the `my-account` with your lib's name):

```json
"@spartacus/my-account": ["dist/my-account"]
```

- `projects/storefrontapp/tsconfig.server.json`

Add the following to the `paths` (and replace the `my-account` with your lib's name):

```json
"@spartacus/my-account": ["../../feature-libs/my-account/public_api"]
```

- `projects/storefrontapp/tsconfig.server.prod.json`

Add the following to the `paths` (and replace the `my-account` with your lib's name):

```json
"@spartacus/my-account": ["../../feature-libs/my-account"]
```

- `scripts/changelog.ts`

In the `const libraryPaths` object, add the following (and replace the `my-account` with your lib's name):

```ts
const libraryPaths = {
  ...,
  '@spartacus/my-account': 'feature-libs/my-account',
};
```

Also make sure to add the lib to the `switch` statement at the end of the file.

- `.github/api-extractor-action/api-extractor-for-branch.sh`

Add the following (replace the `my-account` and `MY_ACCOUNT_CONFIG_PATH` with the name of your lib):

```sh
# @spartacus/my-account
cp "$CONFIG_PATH" ./dist/my-account/api-extractor.json
(
  cd ./dist/my-account && \
  api-extractor run --local --verbose
)
```

- `scripts/packages.ts` - just add your lib to the `const packageJsonPaths` array.

- `sonar-project.properties` - list your library to this file

- `tsconfig.compodoc.json` - add your library to this file

- `projects/schematics/package.json` - add the library to the package group

- `scripts/templates/changelog.ejs` - add the library to `const CUSTOM_SORT_ORDER`

- `ci-scripts/unit-tests-sonar.sh`

Add the library unit tests with code coverage

``` sh
echo "Running unit tests and code coverage for TODO:"
exec 5>&1
output=$(ng test TODO: --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
```

Replace `TODO:` with the appropriate name.

## Multi-entry point library

Sources:

- [ng-packagr examples](https://github.com/ng-packagr/ng-packagr/tree/master/integration/samples/secondary)

### Process

If adding multiple entry points to the generated library, make sure to do the following changes:

- `angular.json` - change the `projects -> lib-name -> sourceRoot` to have the same value as the `root` property. This will enable code coverage report to be properly generated for all the entry points.
- `test.ts` - in order to run the tests for _all_ the entry points, the `test.ts` file has to be moved one level up from `lib-name/src/test.ts` to `lib-name/test.ts`.
This change requires an update in the:

  1. `angular.json` - change the `projects -> lib-name -> architect -> test -> options -> main` value to reflect the new file path
  2. `feature-libs/<lib-name>/tsconfig.lib.json` - update the path in `exclude`
  3. `feature-libs/<lib-name>/tsconfig.spec.json` - update the path in `files`

- make sure to follow the general folder structure, as seen in e.g. `feature-libs/product` library
- add `ng-package.json` to each of the feature folders
- add `paths` entries to some variations of `tsconfig.json` files - it's for the best to search for `@spartacus/product` across the code base and add entries for the generated library

## Testing

Don't forget to:

- run the tests for the generated library - `ng test <lib-name> --code-coverage`. In case of a library with multiple entry points, make sure to check the code-coverage report generate in `coverage/my-account/lcov-report/index.html`
- build the generated library _with Ivy enabled_ - `ng build <lib-name>`
- build the generated library (without Ivy) - `ng build <lib-name> --prod`
- build the production-ready shell app with the included generated library (import a dummy service from the generated service):
  - `yarn build:core:lib:cds` (build all the libs basically)
  - `yarn build`
