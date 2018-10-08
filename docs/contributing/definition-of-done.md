# Spartacus Definition of Done

This document describes the necessary steps to declare a feature or bug for Spartacus as "Done".

To keep the Spartacus code readable and maintainable, please follow these rules, even if you find them violated somewhere. Note that this list is not complete.
When a file is consistently not following these rules and adhering to the rules would make the code worse, follow the local style.

[TOC]

## TL;DR
Run the ```build.sh``` script located in the root of the project. It will check most of the things mentioned in this document, such as the linting and formatting violations, running unit and e2e tests, etc.



## Code is Formatted

We use Visual Studio and require the use of the Prettier vscode plugin.

See [Recommend Angular Dev Tools](dev-tools.md).



## Code is Styled

See [Spartacus Coding Guidelines](coding-guidelines).

### Code Linting

Use the TSLint plugin in vscode.
 ```
 yarn lint
 ```

See [Recommend Angular Dev Tools](dev-tools.md).

### Code Styling with Prettier
Use the Prettier plugin in vscode.

To check that are all the files prettified:
```
yarn prettier
```

To prettify files:
```
yarn prettier-fix
```

### SCSS is Preprocesed (node-sass)

Use the following command to pre-process the sass in projects/storefrontstyles
```
yarn sass
```



## Unit Tests are Passing

```
yarn test [project]
yarn test storefrontlib
```

Chrome will open, and you will see test progress and if the tests pass, with detailed information.



## E2E Tests are Passing

```
yarn e2e
```

Note: E2E tests can currently only be run with SAP. We're working on exposing E2E tests to contributors.



## Test coverage is adequate

Make sure that test coverage is >= 80% for everything and >=60% for branches.

To see test coverage, run the following commands:
```
yarn test [project] --code-coverage
yarn test storefrontlib --code-coverage```

Alternatively:
​```yarn test [project] --code-coverage
yarn test:core:lib
```

The coverage report can be found in ```./coverage/index.html```.



## The Library Builds without Errors

```
yarn build:core:lib
```



## The Shell Starts without Errors

```
yarn start
```

which means that:
- There are no errors in the webpack terminal output.
- There are no errors in the JS console in Chrome when displaying the home page.



## No Regression Errors
Check that the areas the change affects work as before, and that major features (such as home, search, checkout) are not affected.



## New Feature Happy Path Works in the Shell App

Run a smoke test of the feature, deployed in a lib in the shell app.

### Does the new feature require changes in the shell app or configuration as well?

Some files and concepts live in the shell app itself.  Ask yourself if the new code requires an update to the shell app or configuration files.

These changes are likely candidates:

* Adding or changing a route.
* Adding or changing a module (change the path or name)
* Adding a component
* Adding a module
* Changing the way configuration mechanism works



## Verify that the production build works

When you think you are done :)

Run the following commands to verify that the production build works (especially AOT):
```
yarn build:core:lib --prod
yarn start
```

Some reasons why the production build might fail:
* Because of the AOT, we have to explicitly specify some types (even though TypeScript doesn't require them, because it can infer them), i.e. a function return types.
* Be careful when using index.ts (a.k.a barrel) files. When running a production build, you might see the following error in the node/webpack console: 
  ```
  ERROR in : Encountered undefined provider! Usually this means you have a circular dependencies (might be caused by using 'barrel' index.ts files.
  ```
  This is usually caused by having the following import: 
  ```
  import * as fromServices from '../../services'.
  ```
  Instead, we should directly import each class:
  ```import { OccCmsService } from '../../services/occ-cms.service'
  import { DefaultPageService } from '../../services/default-page.service'
  ```
