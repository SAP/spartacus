# Spartacus Definition of Done

This document describes the necessary steps to declare a feature or bug for Spartacus as "Done".

To keep the Spartacus code readable and maintainable, please follow these rules, even if you find them violated somewhere. Note that this list is not complete.
When a file is consistently not following these rules and adhering to the rules would make the code worse, follow the local style.

## TL;DR

Run the `build.sh` script located in the root of the project. It will check most of the things mentioned in this document, such as the linting and formatting violations, running unit and e2e tests, etc.

## Code is Formatted

We use Visual Studio Code and require the use of the Prettier VS Code plugin.

See [Recommend Angular Dev Tools](dev-tools.md).

## Code is Styled

See [Spartacus Coding Guidelines](coding-guidelines).

### Code Linting

Use the `TSLint` plugin in VS Code.

```
yarn lint
```

See [Recommend Angular Dev Tools](dev-tools.md).

### Code Styling with Prettier

Use the `Prettier` plugin in VS Code.

To check that are all the files prettified, run the following:

```
yarn prettier
```

To prettify files, run the following:

```
yarn prettier-fix
```

### SCSS is Preprocesed (node-sass)

Use the following command to pre-process the sass in `projects/storefrontstyles`

```
yarn sass
```

## Unit Tests are Passing

There are unit tests and they are passing.

Run the following commands to perform unit tests:

```
yarn test [project]
yarn test storefrontlib
```

When you run these commands, Chrome opens, and you can see the progress of the tests, with detailed information, including whether the tests pass.

## End-To-End Tests are Passing

All the end-to-end tests are passing.

When applicable, write end-to-end tests to ensure that your new or updated feature is foolproof. If it makes sense to write end-to end tests, the minimum requirement is to write basic UI end-to-end tests. You can also consider writing UI end-to-end tests with a user-flow, but this is optional.

All newly written end-to-end tests must be reviewed, updated, and/or re-used.

Run the following command to perform end-to-end tests:

```
yarn e2e
```

Note: the objective of end-to-end tests is to make sure your feature works. For example, if you are implementing a simple login screen with two buttons (such as the `Login` and `Cancel` buttons), you could write the following tests:

* Log in with valid credentials

* Attempt to log in with invalid credentials

* Fill in the input fields, then click on the `Cancel` button.

Note: E2E tests can currently only be run with SAP. We're working on exposing E2E tests to contributors.

## Test Coverage is Adequate

Make sure that test coverage is >= 80% for everything, and >=60% for branches.

To see the test coverage, run the following commands:

```
yarn test [project] --code-coverage
yarn test storefrontlib --code-coverage
```

Alternatively, you can run the following commands:

```​
yarn test [project] --code-coverage
yarn test:core:lib
```

The coverage report can be found in `./coverage/index.html`.

## The Library Builds without Errors

Run the following command to ensure the library builds without errors

```
yarn build:core:lib
```

## The Shell Starts without Errors

Run the following command to ensure the shell starts without errors:

```
yarn start
```

After running the command, you should see the following:

- There are no errors in the webpack terminal output
- There are no errors in the JS console in Chrome when displaying the home page.

## No Regression Errors

Check that the areas where the change is implemented still work as before. Also verify that major features (such as the homepage, search, and checkout) are not affected.

## New Feature Happy Path Works in the Shell App

Run a smoke test of the feature, deployed in a lib in the shell app.

Then determine if the new feature require changes in the shell app or the configuration files as well.

Some files and concepts live in the shell app itself. Ask yourself if the new code requires an update to the shell app or to the configuration files.

The following changes are likely candidates:

- Adding or changing a route
- Adding or changing a module (changing the path or name)
- Adding a component
- Adding a module
- Changing the way the configuration mechanism works

## Verify the Production Build Works

When you think you are done :)

Run the following commands to verify that the production build works, especially the Ahead-of-Time (AOT) compiler:

```
yarn build:core:lib
yarn start
```

The following are some reasons why the production build might fail:

- Because of the AOT, we have to explicitly specify some types, such as function return types. Even though TypeScript does not require them, it can infer them.

- Be careful when using `index.ts` files (that is, barrel files). When running a production build, you might see the following error in the `node/webpack` console:

  ```
  ERROR in : Encountered undefined provider! Usually this means you have a circular dependencies (might be caused by using 'barrel' index.ts files.
  ```

  This is usually caused by having the following import:

  ```
  import * as fromServices from '../../services'.
  ```

  Instead, you should directly import each class, as follows:

  ```import { OccCmsService } from '../../services/occ-cms.service'
  import { DefaultPageService } from '../../services/default-page.service'
  ```
