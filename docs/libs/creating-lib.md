# Creating a Spartacus library

An easy way to create a new Spartacus library is to run: `ng g library <lib-name>` where the `lib-name` is the name of the new library.

The generated library will be placed in the `projects` folder by default. You need to manually move the generated files to an appropriate directory (`feature-lib` for example) and modify `angular.json` to reflect the new location.

## Aligning with the other libs

In order to be 100% aligned with the existing Spartacus library there are some generated files that should be updated and there are some files that need to be additionally created

### Modifying the generated files

The list of the files that need to modified:

- `angular.json`

Change the `prefix` property to `cx`.

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

- `package.json`

Use the following template:

```json
{
  "name": "@spartacus/TODO:",
  "version": "2.1.0-dev.0",
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
    "@spartacus/core": "2.1.0-dev.0",
    "@spartacus/storefront": "2.1.0-dev.0"
  }
}
```

Make sure to replace `TODO:`s with the relevant information.
Adjust the `@spartacus/core` and/or `@spartacus/storefront` depending on the need.
Make sure the versions match the current spartacus version.
Make sure the `@angular` peer dependencies match the versions specified in the _core_ lib.

- `public-api.ts`

Rename this file to `public_api.ts` and change the path in:

  1. `package.json`'s `paths` section
  2. `ng-package.json`'s `entryFile` property to `./public_api.ts`

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
- `tslint.json` - save to re-format
- the rest of the generated file should be removed - e.g. `README.md` etc.

### Creating additional files

The following files should be created:

- `projects/storefrontapp/src/environments/models/environment.model.ts` - add your feature to this model class
- `projects/storefrontapp/src/environments/models/build.process.env.d.ts` - add your feature environment variable to the `Env` interface located in this file
- `projects/storefrontapp/src/environments/environment.ts` - set you feature for development as enabled or disabled by default
- `projects/storefrontapp/src/environments/environment.prod.ts` - pass the created env. variable to your feature

- `package.json`

Add the following scripts:

```json
"start:b2b:ci:2005": "cross-env SPARTACUS_BASE_URL=https://dev-com-7.accdemo.b2c.ydev.hybris.com:9002 SPARTACUS_API_PREFIX=/occ/v2/ SPARTACUS_B2B=true ng serve --prod",
"build:myaccount:lib": "ng build myaccount --prod",
"build:core:lib:cds:myaccount": "yarn build:core:lib && yarn build:cds:lib && yarn build:myaccount:lib",
"test:myaccount:lib": "ng test myaccount --code-coverage",
"release:myaccount:with-changelog": "cd feature-libs/my-account && release-it && cd ../.."
```

And replace `myaccount` and `my-account` instances with the name of yours lib.

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

- `package.json`


