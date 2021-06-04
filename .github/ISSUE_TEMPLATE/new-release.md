---
name: New Release
about: Checklist for new release
title: 'New Release: *.*.*'
labels: release-activities
assignees: ''

---

## General steps

- [ ] Validate that all merged tickets were tested (QA column must be empty, except for tickets marked as `not-blocking-release`)
- [ ] Create new maintenance branch (`release/*.*.x`) if it doesn't exist yet
- [ ] Announce new maintenance branch (Set topic in tribe channel)
- [ ] Create release branch `release/*.*.*` from the corresponding branch (develop/maintenance)
- [ ] Follow the steps to [release update schematics](https://github.com/SAP/spartacus/blob/develop/projects/schematics/README.md#releasing-update-schematics)
- [ ] Build app on this branch using installation script; prepare the `scripts/install/config.sh` file as below:

    ```bash
    BACKEND_URL="https://20.83.184.244:9002"
    BRANCH='release/*.*.*'
    SPARTACUS_VERSION='*.*.*'
    ```

  Finally, run the script:

    ```bash
    cd scripts/install && ./run.sh install
    ```

  Once finished, run `./run.sh start` to start the apps and check that they are working. You can also go to each app directory and run it with `yarn build`, `start`, `build:ssr`, etc.

- [ ] Run all e2e tests on this latest build (Pro tip: run mobile, regression scripts in parallel to get all the results faster, after that retry failed tests in open mode)

---

## Steps for Spartacus sample data

### For Mac/Linux

- [ ] Cleanup repo, build and generate compodocs and publish on github pages, generate spartacussampledata archives (`./scripts/pre-release.sh`)

### For Windows

- [ ] Cleanup repo, build and generate compodocs and publish on github pages (`yarn generate:docs` and `yarn publish:docs` for patch stable/releases)
- [ ] Get the spartacussampledata source code zips for all 1905, 2005 and 2011 CX versions (use `release/1905/next`, `release/2005/next` and `release/2011/next` branches)
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.zip` -> `spartacussampledataaddon.1905.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.tar.gz` -> `spartacussampledataaddon.1905.tar.gz`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2005/next.zip` -> `spartacussampledata.2005.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2005/next.tar.gz` -> `spartacussampledata.2005.tar.gz`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2011/next.zip` -> `spartacussampledata.2011.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2011/next.tar.gz` -> `spartacussampledata.2011.tar.gz`


### For all operative systems

Do the following steps to keep track of spartacussampledata releases:

- [ ] Tag sample data branches for each version (1905, 2005, 2011):
  - [ ] `git clone https://github.tools.sap/cx-commerce/spartacussampledata` (if already present `cd spartacussampledata && git fetch origin`)
  - [ ] tag the final commit on [release/1905/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/1905/next) branch: `git tag 1905-*.*.* HEAD-COMMIT-HASH-FROM-release/1905/next`
  - [ ] tag the final commit on [release/2005/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/2005/next) branch: `git tag 2005-*.*.* HEAD-COMMIT-HASH-FROM-release/2005/next`
  - [ ] tag the final commit on [release/2011/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/2011/next) branch: `git tag 2011-*.*.* HEAD-COMMIT-HASH-FROM-release/2011/next`
  - [ ] push created tags: `git push origin --tags`

---

- [ ] Before you release libraries, fetch all git tags from github with `git fetch origin --tags` (required to generate release notes)
- [ ] Release libraries with release scripts:
  - Make sure your GITHUB_TOKEN env variable is set and valid
  - Check if you are logged into npm with `npm whoami`
  - If you are not logged in, then login with `npm login`
  - If there are any problems, setup 2FA for npm & `npm set @spartacus:registry https://registry.npmjs.org/`
  - For each package select/type version when prompted:
    - [ ] `npm run release:core:with-changelog`
    - [ ] `npm run release:storefront:with-changelog`
    - [ ] `npm run release:user:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:tracking:with-changelog` (needed since `3.2.0-next.0`)
    - [ ] `npm run release:cds:with-changelog`
    - [ ] `npm run release:assets:with-changelog`
    - [ ] `npm run release:styles:with-changelog`
    - [ ] `npm run release:schematics:with-changelog`
    - [ ] `npm run release:asm:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:cart:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:setup:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:organization:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:storefinder:with-changelog` (needed since `3.0.0-rc.0`)
    - [ ] `npm run release:product:with-changelog` (needed since `3.2.0-next.1`)
    - [ ] `npm run release:smartedit:with-changelog` (needed since `3.2.0-next.0`)
    - [ ] `npm run release:qualtrics:with-changelog` (needed since `3.1.0-next.0`)
    - [ ] `npm run release:product-configurator:with-changelog` (needed since `3.1.0-next.0`)
    - [ ] (for <3.2.0 releases set the spartacus peerDependencies manually, then)  
      `npm run release:cdc:with-changelog` (since 3.2.0 release like any other lib with the same version as everything else. For older versions since 2.1.0-next.0 - publish under `0.<packages-version>.0` eg. `0.201.0-next.0` for first `2.1.0-next.0` release)

- [ ] Check that the release notes are populated on github (if they are not, update them)
- [ ] Check tags on npm.
  - `next` tag should always reference the last non-stable version
  - `latest` tag should always point to the last stable version
  - You can leave `rc` tag until we release stable release.
  - Use `npm view @spartacus/NAME@VERSION` (ie. `npm view @spartacus/cdc@next`) instead of clicking thru the `npmjs.org` website (which is much slower)
  - Use `npm dist-tag` command for tag updates.
- [ ] Test the released libraries from a new shell app
  - [ ] Change the `scripts/install/config.sh` to test npm tag (next/latest/rc) at the same time:

    ```bash
    SPARTACUS_VERSION=`next` # or `latest`, `rc`; still, you can set it to a specific one, ie `*.*.*` (or leave the config file unchanged)
    ```

  - [ ] Run the installation script to make sure you can create a shell app with the latest imported libraries with no errors:

    ```bash
    cd scripts/install && ./run.sh install_npm
    ```

- [ ] Merge release branch (PR from release/*.*.*) to the maintenance branch
- [ ] Announce the new release on tribe channel
