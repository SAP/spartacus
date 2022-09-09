# Creating a Spartacus library

An easy way to create a new Spartacus library is to run: `ng g library <lib-name>` where the `lib-name` is the name of the new library.

The library will be generated in the `feature-libs` folder by default. You need to manually move the generated files to an appropriate directory (if necessary) and modify `angular.json` to reflect the new location.

This document can also serve as the guideline for the future schematic that can automate this process.

## Table of contents

- [Creating a Spartacus library](#creating-a-spartacus-library)
  - [Table of contents](#table-of-contents)
  - [Naming conventions](#naming-conventions)
  - [Generating a library](#generating-a-library)
  - [Aligning with the other libs](#aligning-with-the-other-libs)
    - [Modifying the generated files](#modifying-the-generated-files)
    - [Additional changes to existing files](#additional-changes-to-existing-files)
  - [Multi-entry point library](#multi-entry-point-library)
    - [Process](#process)
  - [Testing](#testing)
  - [Schematics](#schematics)
    - [Configuring Schematics](#configuring-schematics)
    - [Testing Schematics](#testing-schematics)

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
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
   reporters: ['progress', 'kjhtml', 'dots', 'junit'],
    junitReporter: {
      outputFile: 'unit-test-<lib-name>.xml',
      outputDir: require('path').join(__dirname, '../../unit-tests-reports'),      
      useBrowserName: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/TODO:'),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 80,
          lines: 80,
          branches: 70,
          functions: 80,
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
  "repository": "https://github.com/SAP/spartacus",
  "dependencies": {
    "tslib": "^2.0.0"
  },
  "peerDependencies": {
    "@angular/common": "^10.1.0",
    "@angular/core": "^10.1.0",
    "rxjs": "^6.6.0",
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

  - in order to run the tests for _all_ the entry points, the `test.ts` file has to be moved one level up from `lib-name/src/test.ts` to `lib-name/test.ts`.

  This change requires an update in:

  1. `angular.json` - change the `projects -> lib-name -> architect -> test -> options -> main` value to reflect the new file path
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
    "target": "es2015",
    "module": "es2020",
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
    "enableResourceInlining": true,
    "strictTemplates": true,
    "strictInputAccessModifiers": true
  },
  "exclude": ["test.ts", "**/*.spec.ts"]
}
```

- `tsconfig.spec.json` - add `"target": "es2015", "module": "es2020"` in `"compilerOptions"`:

```json
{
  /* ... */
  "compilerOptions": {
    /* ... */
    "target": "es2015",
    "module": "es2020"
  }
}
```

- run `yarn config:update` script to update `compilerOptions.path` property in tsconfig files
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
  and then run `yarn config:update` (to fix the formatting)

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
"build:asm": "yarn --cwd feature-libs/asm run build:schematics && ng build asm --configuration production",
"release:asm:with-changelog": "cd feature-libs/asm && release-it && cd ../..",
```

And replace `asm` instances with the name of yours lib.

Also, add the new lib to the `build:libs` and `test:libs` scripts.

- `.github/ISSUE_TEMPLATE/new-release.md`

Add `- [ ] `npm run release:TODO::with-changelog`(needed since`x.x.x`)` under the `For each package select/type version when prompted:` section, and replace `TODO:` to match the `package.json`'s release script name.

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
    "after:version:bump": "cd ../.. && ng build TODO: --configuration production"
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
Optionally, adjust the `path` property with the `peerDependencies` to match the peer dependencies defined in the `package.json`.

- `scripts/changelog.ts`

In the `const libraryPaths` object, add the following (and replace the `my-account` with your lib's name):

```ts
const libraryPaths = {
  ...,
  '@spartacus/my-account': 'feature-libs/my-account',
};
```

Also make sure to add the lib to the `switch` statement at the end of the file.

- `scripts/packages.ts` - just add your lib to the `const packageJsonPaths` array.

- `sonar-project.properties` - list your library to this file

- `projects/schematics/package.json` - add the library to the package group

- `scripts/templates/changelog.ejs` - add the library to `const CUSTOM_SORT_ORDER`

- `ci-scripts/unit-tests-sonar.sh`

Add the library unit tests with code coverage

```sh
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

- make sure to follow the general folder structure, as seen in e.g. `feature-libs/product` library
- add `ng-package.json` to each of the feature folders
- run `yarn config:update` script to update `compilerOptions.path` property in tsconfig files

## Testing

Don't forget to:

- run the tests for the generated library - `ng test <lib-name> --code-coverage`. In case of a library with multiple entry points, make sure to check the code-coverage report generated in the `coverage/my-account/lcov-report/index.html`
- build the generated library _with Ivy enabled_ - `ng build <lib-name>`
- build the generated library (without Ivy) - `ng build <lib-name> --configuration production`
- build the production-ready shell app with the included generated library (import a dummy service from the generated service):
  - `yarn build:libs` (build all the libs)
  - `yarn build`

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
- add new feature lib consts in schematics folder - `feature-libs\<lib-name>\schematics\constants.ts` where the `lib-name` is the name of the new library
- add new feature lib schema.json elements in schematics folder - `feature-libs\<lib-name>\schematics\add-<lib-name>\schema.json` where the `lib-name` is the name of the new library
- add new feature chain method to 'shouldAddFeature' and function to add it - `feature-libs\<lib-name>\schematics\add-<lib-name>\index.ts` where the `lib-name` is the name of the new library
- create new feature lib module in - `projects/storefrontapp/src/app/spartacus/features`
- create your schematics configuration in e.g. `projects/schematics/src/shared/lib-configs/asm-schematics-config.ts` and add it to the `projects/schematics/src/shared/schematics-config-mappings.ts` file. 


### Testing Schematics

- Install verdaccio locally `$ npm i -g verdaccio@latest` (only for the first time)
- Run it: `$ verdaccio`
- Create an npm user: `$ npm adduser --registry http://localhost:4873`. After completing the registration of a new user, stop the verdaccio. This setup is only required to do once
- Create new angular project `ng new schematics-test --style=scss`
- Run verdaccio script `ts-node ./tools/schematics/testing.ts` (or `./node_modules/ts-node/dist/bin.js ./tools/schematics/testing.ts` in case you don't have _ts-node_ installed globally) in main spartacus core folder
- Build all libs (if it is first time, if not just build your new lib)
- Publish
- Add spartacus to new angular project `ng add @spartacus/schematics@latest --baseUrl https://spartacus-demo.eastus.cloudapp.azure.com:8443/ --baseSite=electronics-spa
