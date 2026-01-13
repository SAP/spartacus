# Dependencies management

This document describes how to manage dependencies in this repo.

## How to update a dependency version that is not Angular-related
- change version of the package to the highest possible version in the main `package.json` and also other libraries' specific package.json files
- find/Google the changelog of the package to understand what has changed in the bumped version (being especially careful with package's major release changelog - as it might contain descriptions of breaking changes, that might potentially affect us)
- run `npm install` - to install actual versions of the packages in our repo
- run `npm run generate:deps` - to update the `dependencies.json` file with the actual versions of the packages installed in our repo
- commit changes in `package.json` files (multiple files) and in `package-lock.json` and in `dependencies.json`
- test the affected features:
  - for 3rd party packages affecting our UI features:
     - smoke test application manually in CSR `npm run start`, comparing with the app before the upgrade
     - smoke test application manually in SSR `npm run dev:ssr`, comparing with the app before the upgrade
  -  for 3rd party packages affecting our Schematics:
     - build libs (and schematics). run schematics/testing.ts tool to publish libs and create a new Angular app and install Spartacus there with schematics. For more see readme of [schematics/testing.ts](/projects/schematics/README.md)
- When all CI checks pass, ask repo admin to merge (because 1 check will fail - the check protecting changes in peer deps)

## How to update Angular-related dependency
Updating Angular-ecosystem dependencies (e.g. Angular itself `@angular/core`, `@angular/cli`, etc. , but also 3rd party Angular-related like `@ng-select/ng-select` etc.) should be done with Angular CLI. Please follow the document [Updating Angular-ecosystem packages version in Spartacus]()) (TODO add link! 🚨) for detailed instructions.

## Don't change peerDependencies in releases different than Major (once a year)
Peer Dependencies should not be changed in the middle of the year, unless there is a critical security issue or a major bug that needs to be fixed. Changing a peerDependency minimal-version constraint in package.json of our libraries is considered a breaking change, because then customers are forced to install a different version of the peerDependency than before.

Therefore Peer Dependencies should only be changed in Major releases, which happen once a year.

To protect it, we have a [check in our CI `ci-scripts/check-peer-deps.sh`](/ci-scripts/check-peer-deps.sh) that prevents changing peerDependencies in PRs.
For Major releases, this check need to be dismissed, e.g. by requesting an exceptional merge from the repository admin.